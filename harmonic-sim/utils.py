
from itertools import groupby


def flatten_list(t:list):
    return [item for sublist in t for item in sublist]


def remove_consecutive_repeats(t):
    return [x[0] for x in groupby(t)]