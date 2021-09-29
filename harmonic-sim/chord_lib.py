
import re

from functools import partial

import ChordalPy as cpy
import note_seq.chord_symbols_lib as cslib

# Patterns 
harte_ext_pattern = "^((N|X)|(([A-G](b*|#*))((:(maj|min|dim|aug|1|5|sus2|sus4|maj6|min6|7|maj7|min7|dim7|hdim7|minmaj7|aug7|9|maj9|min9|11|maj11|min11|13|maj13|min13)(\((\*?((b*|#*)([1-9]|1[0-3]?))(,\*?((b*|#*)([1-9]|1[0-3]?)))*)\))?)|(:\((\*?((b*|#*)([1-9]|1[0-3]?))(,\*?((b*|#*)([1-9]|1[0-3]?)))*)\)))?((/((b*|#*)([1-9]|1[0-3]?)))?)?))$"
hart_short_pattern = "^((N)|(([A-G][b#]*)((:(maj|min|dim|aug|maj7|min7|7|dim7|hdim7|minmaj7|maj6|min6|9|maj9|min9|sus4)(\((\*?([b#]*([1-9]|1[0-3]?))(,\*?([b#]*([1-9]|1[0-3]?)))*)\))?)|(:\((\*?([b#]*([1-9]|1[0-3]?))(,\*?([b#]*([1-9]|1[0-3]?)))*)\)))?((/([b#]*([1-9]|1[0-3]?)))?)?))$"

natural_to_hsteps = cpy.Tables.notes["naturalToHalfStep"]


def strip_chord_bass(chord_figure):
    return chord_figure.split("/")[0]


def match_chord_quality(chord: cpy.Chord, mask_idxs: list):

    # Get the half-steps index of the root
    root_idx = natural_to_hsteps[chord.root]
    # Compute the absolute index for the mask
    mask_idxs_abs = [(root_idx + mask_idx) % 12 \
        for mask_idx in mask_idxs]
    # Get the note constituents and check mask
    chord_pitches = chord.get_note_array()
    return all([chord_pitches[mask_idx] == 1
                for mask_idx in mask_idxs_abs])


# Chord-quality functions for specific/common types
match_maj = partial(match_chord_quality, mask_idxs=[4, 7])
match_min = partial(match_chord_quality, mask_idxs=[3, 7])
match_aug = partial(match_chord_quality, mask_idxs=[4, 8])
match_dim = partial(match_chord_quality, mask_idxs=[3, 6])


def chord_symbol_quality(chord):
    """
    Return the quality (major, minor, dimished, augmented) of a chord.

    Args:
        chord (str or ChordalPy.Chord): a representation of a chord symbol for
            which quality is computed. It can be either a string representation, 
            or a ChordalPy.Chord instance if the chord has already been parsed.

    Returns:
        One of CHORD_QUALITY_MAJOR, CHORD_QUALITY_MINOR, CHORD_QUALITY_AUGMENTED,
        CHORD_QUALITY_DIMINISHED, or CHORD_QUALITY_OTHER.
    """
    # Parse the given chord in case a string representation is passed
    chord = cpy.parse_chord(chord) if isinstance(chord, str) else chord

    if match_maj(chord):
        return cslib.CHORD_QUALITY_MAJOR
    elif match_min(chord):
        return cslib.CHORD_QUALITY_MINOR
    elif match_aug(chord):
        return cslib.CHORD_QUALITY_AUGMENTED
    elif match_dim(chord):
        return cslib.CHORD_QUALITY_DIMINISHED
    else:  # no matches found for chord quality
        return cslib.CHORD_QUALITY_OTHER


def chord_symbol_root(chord):
    """
    Return the midi pitch associated to the chord root.

    Args:
        chord (str or ChordalPy.Chord): a representation of a chord symbol for
            which the root is extracted. It can be either a string or a 
            ChordalPy.Chord instance if the chord has already been parsed.

    Returns:
        the pitch class of the root, expressed as MIDI pitch number
    """
    # Parse the given chord in case a string representation is passed
    chord = cpy.parse_chord(chord) if isinstance(chord, str) else chord

    root_str = chord.root  # this is just the original representation
    root_step, root_alter = cslib._parse_root(root_str)
    return cslib._pitch_class_to_midi(root_step, root_alter)
