import joblib
from nltk import ngrams as nltk_ngrams
import ngrams_lib as ng
from harmonic_lib import ngram_hsim


CHORDS_PATH = "./sonar_databundle.joblib"
NGRAMS_PATH = "./sonar_ngrams.joblib"


def compute_similarity(ngrams_bag, ngrams_bag_dict):
    track_ids = list(ngrams_bag_dict.keys())
    hsim_map = {track_id: {} for track_id in track_ids}

    for i, track_a in enumerate(track_ids):
        a_rpbag = ngrams_bag[track_a]  # fix for now
        for j in range(i + 1, len(track_ids)):  # move ahead
            track_b = track_ids[j]
            b_rpbag = ngrams_bag[track_b]

            hsim, longest_rps = ngram_hsim(a_rpbag, b_rpbag)
            if hsim > 0.:  # save only non-trivial
                hsim_map[track_a][track_b] = hsim
                hsim_map[track_b][track_a] = hsim


if __name__ == "__main__":
    raw, encoded = ng.open_chord(CHORDS_PATH)
    ngram = ng.open_ngram(NGRAMS_PATH)
