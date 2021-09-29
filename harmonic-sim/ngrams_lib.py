from itertools import combinations
import joblib

from nltk import ngrams as nltk_ngrams

DATABUNDLE_PATH = "./sonar_databundle.joblib"
OUTPUT_FILE = "sonar_ngrams.joblib"  # name of the joblib output file

CHORDS_PATH = "./sonar_databundle.joblib"
NGRAMS_PATH = "./sonar_ngrams.joblib"
INDEX_PATH = "./sonar_ngrams_index.joblib"
ENCODED_PATH = "./sonar_encoding_bundle.joblib"


def extract_ngrams(track_name: str, sequence: list, n_start: int = 2):
    """Returns all the repeating ngrams given the chords of a track
    Parameters
    ----------
    track_name: str
        the title or the identifier of the song
    sequence: list
        a list containing all the chords of the song
    n_start: int, optional
        the minimum number of n-grams the algorithms will search for.

    Returns
    -------
    dict
        a dictionary having as a key the title of the track and as a value a list tuples, each of which is a repeating
        n-gram.
    """
    all_track_ngrams = []

    def search_ngrams(encoded_track_seq, n):

        for i in range(n, n + 1):
            ng = nltk_ngrams(encoded_track_seq, i)
            ngrams_list = [n for n in ng]
            equal_ngrams_list = list(set([a for a, b in combinations(ngrams_list, 2) if a == b]))
            if len(equal_ngrams_list) > 0:
                n_new = n + 1
                all_track_ngrams.extend(equal_ngrams_list)
                search_ngrams(encoded_track_seq, n_new)
            else:
                break
    search_ngrams(sequence, n_start)
    return {track_name: all_track_ngrams}


def process_ngrams(data_path: str, out_name: str, save: bool = True):
    """Processes the repeating n-grams of a data bundle and saves them in a joblib file.
    Parameters
    ----------
    data_path: str
        the path of the chords data bundle
    out_name: str
        a list containing all the chords of the song
    save: bool, optional
        a parameter to set True if needed to save the file, False otherwise.

    Returns
    -------
    dict
        returns a dictionary having as a key the track titles, and as a value a list containing all the repeating
        n-grams for that track. If save=True it saves the resulting dictionary into a file with name=out_name.
    """
    data = joblib.load(data_path)

    # raw = data['raw']
    encoded = data['encoded']

    # encoded_indexed = map_chords(encoded)
    final = []
    for sequence_name in encoded:
        tn = extract_ngrams(sequence_name, encoded[sequence_name], 3)
        final.append(tn)

    if save:
        save_joblib(final, out_name)

    return final


def open_chord(chords_path: str):
    """Opens the joblib files containing chords and ngrams, respectively.
    Parameters
    ----------
    chords_path: str
        the path of the chords data bundle
    ngram_path: str
        the path of the file containing the parsed n-grams

    Returns
    -------
    dicts
        returns two dictionaries containing raw chords and encoded chords, respectively. The dictionaries have
        the following structure: key=track name, value=list of tuples.
    """
    with open(chords_path, "rb") as cd:
        chords = joblib.load(cd)
    raw_chord = chords['preproc']
    encoded_chord = chords['encoded']

    return raw_chord, encoded_chord


def open_ngram(ngram_path: str):
    """Opens the joblib files containing the ngrams.
    Parameters
    ----------
    ngram_path: str
        the path of the file containing the parsed n-grams

    Returns
    -------
    dict
        returns a dictionary containing all the ngrams. The dictionary has
        the following structure: key=track name, value=list of tuples.
    """
    with open(ngram_path, "rb") as fo:
        ngrams_bag = joblib.load(fo)
    ngrams_bag_dict = {list(track_dict.keys())[0]: track_dict[list(track_dict.keys())[0]] for track_dict in ngrams_bag}

    return ngrams_bag_dict


def ngram_position(encoded_chord: dict, ngram_dict: dict):
    """Computes the position of a ngram within the track's chord sequence.
    Parameters
    ----------
    encoded_chord: dict
        a dictionary with key=track name and value=list of encoded chords
    ngram_dict: dict
        a dictionary with key=track name and value=list of tuples, each of which is a repeating n-gram
    Returns
    -------
    dict
        a dictionary with key=track name and value=list of tuples, each of which is a the position of the n-gram in the
        chord sequence and its length, e.g. (18, 3).
    """
    def ngram_index(sequence, ngram):
        return list(nltk_ngrams(sequence, len(ngram))).index(tuple(ngram))

    index_dict = {}
    for tr in encoded_chord:
        index_length = []
        for ng in ngram_dict[tr]:
            try:
                idx = ngram_index(encoded_chord[tr], ng)
                index_length.append((idx, len(ng)))
            except KeyError:
                print(tr, ng)
                pass
        index_dict.update({tr: index_length})
    return index_dict


def get_raw_ngrams(indexes, raw_sequence: dict):
    """Finds the position of indexed n-grams on the raw sequence.
    Parameters
    ----------
    indexes: dict :int
        either the path of the joblib file containing the indexed or the indexes in a dict format
    raw_sequence: dict
        a dictionary with key=track name and value=list of tuples, each of which is a repeating n-gram expressed
        in raw notation
    Returns
    -------
    dict
        a dictionary with key=track name and value=list of tuples, each of which is an n-gram in raw notation.
    """
    if type(indexes) == str:
        with open(indexes, "rb") as ip:
            ngrams_index = joblib.load(ip)
    else:
        ngrams_index = indexes

    raw_ngrams = {}
    raw_position = {}
    for tr in ngrams_index:
        indexes = ngrams_index[tr]
        raw_ngram = []
        positions = []
        for index, length in indexes:
            ngram = [c for c, cs in raw_sequence[tr]][index: (index + length)]
            position = [cs for c, cs in raw_sequence[tr]][index]
            positions.append(position)
            # print(ngram)
            raw_ngram.append(ngram)
        raw_ngrams.update({tr: raw_ngram})
        raw_position.update({tr: positions})
    return raw_ngrams, raw_position


def save_joblib(ngrams_track_dict, out_file_name: str):
    """
    Given a file, saves it in a joblib format with the name specified in the input.
    """
    joblib.dump(ngrams_track_dict, out_file_name)


if __name__ == '__main__':

    # ENCODE N-GRAMS
    # process_ngrams(DATABUNDLE_PATH, OUTPUT_FILE, save=False)

    # OPEN Joblib FILES
    # raw, encoded = open_chord(CHORDS_PATH)
    # ngram = open_ngram(NGRAMS_PATH)

    # print(encoded)

    # FIND N-GRAM INDEX
    # ngrams_index = ngram_position(encoded, ngram)

    # SAVE THE N-GRAM INDEX
    # save_joblib(ngrams_index, "sonar_ngrams_index.joblib")

    # FIND N-GRAM POSITION IN THE RAW SEQUENCE
    # raw_ngrams, position = get_raw_ngrams(INDEX_PATH, raw)

    # SAVE THE N-GRAM INDEX
    # save_joblib(raw_ngrams, "sonar_ngrams_index.joblib")

    with open('./sonar_ngrams.joblib', "rb") as cd:
        data = joblib.load(cd)
        print(data)

    # encoded = data['encoded']
    # final = {}
    # for x in encoded:
    #     ng = extract_ngrams(x, encoded[x], 3)
    #     final.update(ng)
    #
    # save_joblib(final, "sonar_ngrams.joblib")
