import json
import os

from music21 import interval, note
from ngrams_lib import save_joblib

JAMS_PATH = "/Users/andreapoltronieri/Documents/Polifonia/Sonar/datasets/annotations"
DIRS_NAME = ['isophonics', 'schubert-winterreise', 'jaah']


def find_jams(jams_path: str, dirs_name: list):
    jams_files = []
    for path, dirs, files in os.walk(jams_path):
        for dir in dirs:
            if dir in dirs_name:
                dataset_jams = os.listdir(f"{path}/{dir}")
                dataset_jams_files = [f"{path}/{dir}/{fn}" for fn in dataset_jams]
                jams_files.extend(dataset_jams_files)
    return jams_files


def distance_from_c(chord):
    chord = chord.split(':')[0]
    if chord not in ['N', 'X', 'Z']:
        a_interval = interval.Interval(noteStart=note.Note(chord), noteEnd=note.Note('C'))
        diatonic_interval = a_interval.semitones
    else:
        diatonic_interval = chord
    return diatonic_interval


def get_jams_chord(jams_path):
    with open(jams_path, 'r') as jf:
        jams_data = json.load(jf)
        # artist = jams_data['file_metadata']['artist'].replace(' ', '_')
        # title = jams_data['file_metadata']['title'].replace(' ', '_')
        # track_name = f"{artist}-{title}"
    track_name = jams_path.split('/')[-1].split('.')[0].replace(' ', '_')
    key_annotation = [(z['value'], z['time']) for k in jams_data['annotations']
                      for z in k['data'] if k['namespace'] == "key_mode"]
    chords = [ca['value'] for x in jams_data['annotations'] for ca in x['data'] if x['namespace'] == "chord"]
    chord_time = [ca['time']for x in jams_data['annotations'] for ca in x['data'] if x['namespace'] == "chord"]

    indexes = []
    c_distance = []
    for k, kt in key_annotation:
        closest_timestamp = chord_time[min(range(len(chord_time)), key=lambda ix: abs(chord_time[ix] - kt))]
        index = chord_time.index(closest_timestamp)
        indexes.append(index)
        c_distance.append(distance_from_c(k))

    sequences = []
    if len(indexes) > 1:
        for i in range(len(indexes)):
            if i == 0:
                seq = {c_distance[i]: chords[:indexes[1]]}
                # print(c_distance[i], len(chords[:indexes[1]]), chords[:indexes[1]])
            if i >= 1 and i != len(key_annotation) - 1:
                seq = {c_distance[i]: chords[(indexes[i]):indexes[i + 1]]}
                # print(c_distance[i], len(chords[(indexes[i]):indexes[i + 1]]), chords[(indexes[i]):indexes[i + 1]])
            if i == len(key_annotation) - 1:
                seq = {c_distance[i]: chords[indexes[i]:]}
                # print(c_distance[i], len(chords[indexes[i]:]), chords[indexes[i]:])
            sequences.append(seq)
    else:
        try:
            sequences.append({c_distance[0]: chords})
        except IndexError:
            pass

    return {track_name: sequences}


if __name__ == "__main__":
    jams = find_jams(JAMS_PATH, DIRS_NAME)

    # distance_from_c('Eb')
    final_dict = {}
    for tr in jams:
        key_dict = get_jams_chord(tr)
        final_dict.update(key_dict)

    save_joblib(final_dict, 'sonar_raw_tonalities.joblib')
