import json
import os

import joblib
from music21 import interval, note
from ngrams_lib import save_joblib, open_chord
from transposer import transpose_line
import pandas as pd

JAMS_PATH = "/Users/andreapoltronieri/Documents/Polifonia/Sonar/datasets/annotations"
CHORD_PATH = "./sonar_databundle.joblib"
DATASET_META = "./sonar_datasets_meta.csv"
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


def open_meta(meta_path):
    with open(meta_path, 'r') as mp:
        data = pd.read_csv(mp)
        meta = pd.DataFrame(data)
    return meta['id'].tolist(), meta['path'].tolist()


def open_jams(jams_path):
    with open(jams_path, 'r') as jf:
        jams_data = json.load(jf)
    return jams_data


def align_path(jams_path, meta_path):
    jamses = find_jams(jams_path, DIRS_NAME)
    ids, paths = open_meta(meta_path)
    tr_names = []
    valid_paths = []
    for i, path in enumerate(paths):
        for jams in jamses:
            if path.split('annotations')[1] == jams.split('annotations')[1]:
                tr_names.append(ids[i])
                valid_paths.append(jams)
    return tr_names, valid_paths


def align_chords(jams_name, jams_path, chords_path):
    jams = open_jams(jams_path)
    raw, encoded = open_chord(chords_path)

    key_annotation = [(z['value'], z['time']) for k in jams['annotations']
                      for z in k['data'] if k['namespace'] == "key_mode"]
    chords = [c for c, t in raw[jams_name]]
    chord_time = [t for c, t in raw[jams_name]]
    return key_annotation, chords, chord_time

    # track_name = jams_path.split('/')[-1].split('.')[0].replace(' ', '_')
    # key_annotation = [(z['value'], z['time']) for k in jams_data['annotations']
    #                   for z in k['data'] if k['namespace'] == "key_mode"]
    # chords = [ca['value'] for x in jams_data['annotations'] for ca in x['data'] if x['namespace'] == "chord"]
    # chord_time = [ca['time'] for x in jams_data['annotations'] for ca in x['data'] if x['namespace'] == "chord"]


def distance_from_c(chord):
    chord = chord.split(':')[0]
    if chord not in ['N', 'X', 'Z']:
        a_interval = interval.Interval(noteStart=note.Note(chord), noteEnd=note.Note('C'))
        diatonic_interval = a_interval.semitones
    else:
        diatonic_interval = chord
    return diatonic_interval


def get_jams_chord(key_annotation, chords, chord_time, track_name):
    indexes = []
    c_distance = []
    for k, kt in key_annotation:
        closest_timestamp = chord_time[min(range(len(chord_time)), key=lambda ix: abs(chord_time[ix] - kt))]
        index = chord_time.index(closest_timestamp)
        indexes.append(index)
        c_distance.append(distance_from_c(k))
        # c_distance.append(k)

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


def transpose(tonalities):
    with open(tonalities, "rb") as cd:
        data = joblib.load(cd)

    transposed_dict = {}
    for x in data:
        transposed_list = []
        for tn in data[x]:
            for k in tn:
                key = int(str(k).replace('N', '0'))
                chords = tn[k]
                transposed_chords = [transpose_line(f"|{c}", key, 'C').replace("|", "") for c in chords]
                transposed_list.extend(transposed_chords)
        transposed_dict.update({x: transposed_list})

    return transposed_dict


if __name__ == "__main__":
    ids, paths = align_path(JAMS_PATH, DATASET_META)

    # TRANSPOSE
    transposed_dict = transpose('./sonar_raw_tonalities.joblib')
    print(transposed_dict)

    # TRIM SEQUENCES PER TONALITY
    # final_dict = {}
    # for i in range(len(ids)):
    #     name = ids[i]
    #     path = paths[i]
    #     key_annotation, chord, chord_time = align_chords(name, path, CHORD_PATH)
    #     key_dict = get_jams_chord(key_annotation, chord, chord_time, name)
    #     final_dict.update(key_dict)
    # print(final_dict)
    #

    save_joblib(transposed_dict, 'sonar_transposed_chords.joblib')
