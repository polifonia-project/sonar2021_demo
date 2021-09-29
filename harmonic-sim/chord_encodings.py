"""
Collects a number of encoding functions to convert chord symbols into vector
representation that can be passed to music models.
"""

from copy import Error

import ChordalPy
from note_seq import chord_symbols_lib as cslib
from note_seq import encoder_decoder
from note_seq import constants

from chord_lib import chord_symbol_quality, chord_symbol_root, strip_chord_bass


NOTES_PER_OCTAVE = constants.NOTES_PER_OCTAVE
NO_CHORD = "N"  # this is different than N.C. in note_seq.constants

# Mapping from pitch class index to name.
_PITCH_CLASS_MAPPING = ['C', 'C#', 'D', 'Eb', 'E', 'F',
                        'F#', 'G', 'Ab', 'A', 'Bb', 'B']


class ChordEncodingError(Exception):
  pass


class TriadChordOneHotEncoding(encoder_decoder.OneHotEncoding):
    """
    Encodes chords as root + triad type, with zero index for "no chord".
    Encodes chords as follows:
    0:     "no chord"
    1-12:  chords with a major triad, where 1 is C major, 2 is C# major, etc.
    13-24: chords with a minor triad, where 13 is C minor, 14 is C# minor, etc.
    25-36: chords with an augmented triad, where 25 is C augmented, etc.
    37-48: chords with a diminished triad, where 37 is C diminished, etc.
    """

    @property
    def num_classes(self):
        return 4 * NOTES_PER_OCTAVE + 1

    @property
    def default_event(self):
        return NO_CHORD

    def encode_event(self, event):
        if event == NO_CHORD:
            return 0

        chord = ChordalPy.parse_chord(event)
        root = chord_symbol_root(chord)
        quality = chord_symbol_quality(event)

        if quality == cslib.CHORD_QUALITY_MAJOR:
            return root + 1
        elif quality == cslib.CHORD_QUALITY_MINOR:
            return root + NOTES_PER_OCTAVE + 1
        elif quality == cslib.CHORD_QUALITY_AUGMENTED:
            return root + 2 * NOTES_PER_OCTAVE + 1
        elif quality == cslib.CHORD_QUALITY_DIMINISHED:
            return root + 3 * NOTES_PER_OCTAVE + 1
        else:
            raise ChordEncodingError('%s is not a standard triad' % event)

    def decode_event(self, index):
        if index == 0:
            return NO_CHORD
        elif index - 1 < 12:
            # major
            return _PITCH_CLASS_MAPPING[index - 1] + ':maj'
        elif index - NOTES_PER_OCTAVE - 1 < 12:
            # minor
            return _PITCH_CLASS_MAPPING[index - NOTES_PER_OCTAVE - 1] + ':min'
        elif index - 2 * NOTES_PER_OCTAVE - 1 < 12:
            # augmented
            return _PITCH_CLASS_MAPPING[index - 2 * NOTES_PER_OCTAVE - 1] + ':aug'
        else:
            # diminished
            return _PITCH_CLASS_MAPPING[index - 3 * NOTES_PER_OCTAVE - 1] + ':dim'


class DecompositionOneHotEncoding(encoder_decoder.OneHotEncoding):
    """
    Encodes a chord based on an enumeration function mapping the chord's note
    constituents (an array of NOTES_PER_OCTAVE elements) to a word token. This
    is different to a simple enumeration of chord symbols, because it looks at
    composition of the chord rather than assigning a name to each symbol. In
    fact, two chords with different symbols may have the same note constituents,
    which in turn will produce the same encoding.

    NOTES:
        - The decode event is not trivial and has to be improved! Indeed, given
            that our encoding is computed as a hash function on the chord's
            composition (the note constituents vector), this is not directly
            feasible unless some heuristics are considered -- given a group of
            notes, we will have to assign a chord label. Alternatively, as we
            are storing all the chord labels before being encoded, one simple
            workaround is to return all those chords labels associated to the
            same encoding (having the same constituents despite their labels).
    """

    def __init__(self, chord_set: set):
        """
        Construct and initialise the encoder, given a comprehensive list of
        unique chord symbols -- intended as the support vocabulary of chords. 
        """
        super().__init__()
        # First of all, remove the silent chord, which has separate treatmnent
        # XXX This works if silent chords are explicitly referenced with the
        # NO_CHORD symbol (according to Harte's notation). However, there might
        # be other chords that are "nullified" by the modifications; although
        # it does not happen with the current data, this code would not work.
        # chord_set = [chord for chord in chord_set if chord != NO_CHORD]
        
        # Compute the content-based chord hash for each of them
        self.chord_to_hash = {chord: self._compute_chord_hash(chord) 
                              for chord in chord_set}
        # Make sure that each unique chord hash has its own index
        self.hash_to_index = {hash: index for index, hash
                              in enumerate(set(self.chord_to_hash.values()))}

        # And now the inverse mappings, out of convenience for decoding
        # Given the non-bijective nature of chord_to_hash we keep all matches
        self.hash_to_chords = {hash: [chord_fig for chord_fig, chord_hash
            in self.chord_to_hash.items() if chord_hash == hash]
            for hash in self.hash_to_index.keys()}
        # The index_to_hash mapping is bijective, so it is safe to invert
        self.index_to_hash = {index: hash for hash, index 
            in self.hash_to_index.items()}

    def _compute_chord_hash(self, chord_figure: str):
        """
        Compute the hash for the given chord figure.
        """
        chord_nob = strip_chord_bass(chord_figure)
        if ":" not in chord_figure:
            chord_nob = chord_nob + ":maj"
        try:  # attempting to parse the chord in Harte
            chord_nob = ChordalPy.parse_chord(chord_nob)
        except Error as e:
            print(f"Chord symbol {chord_figure} cannot be parsed." + e)
        # Use ChordalPy's hash function
        return chord_nob.get_pseudo_hash()

    @property
    def num_classes(self):
        return len(self.hash_to_index) # + 1 if NO_CHORD

    # @property
    # def default_event(self):
    #     return NO_CHORD

    def encode_event(self, event: str):
        """
        Encode a string representing a chord into a content-based index, based
        on the the mapping computed on the given chord set (vocabulary). 
        """
        # if event == NO_CHORD:  # an explicit empty chord
        #     return 0
        if event not in self.chord_to_hash:
            raise ChordEncodingError(
                'Chord is not in the vocabulary: %s' % event)     
        
        chord_hash = self.chord_to_hash[event]
        return self.hash_to_index[chord_hash]


    def decode_event(self, index: int):
        """
        For simplicity, it returns the shortest chord symbol (the easiest) in 
        the vocabulary that corresponds to the configuration associated to the
        given index (the actual decomposition).
        """

        if index not in list(self.index_to_hash.keys()):
            raise ValueError("%s is not a valid supported index.")
        # Retrieve all chords associated to the indexed decomposition
        chords = self.hash_to_chords[self.index_to_hash[index]]

        return sorted(chords)[0]  # the shortest figure

