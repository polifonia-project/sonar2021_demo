"""
Utility functions for computing the n-gram-based harmonic similarity.
"""

from itertools import groupby


def flatten_list(t:list):
    return [item for sublist in t for item in sublist]


def remove_consecutive_repeats(t):
    return [x[0] for x in groupby(t)]


def intersection(collection_a, collection_b):
    """
    The intersection between two collections considered
    as sets (duplicated items will be removed).
    """
    set_a = set(collection_a)
    set_b = set(collection_b)

    return set_a.intersection(set_b)


def degree_max_repetition(recpat_bag:list):
    """
    Computes the degree of maximal repetition from a bag of
    recurring patterns -- a list of ngram tuples.
    """
    return max([len(recpat) for recpat in recpat_bag])


def ngram_hsim(rpg_a:list, rpg_b:list):
    """
    Computes the degree of maximal repetition from a bag of
    recurring patterns -- a list of tuples.
    """
    degree_a = degree_max_repetition(rpg_a)
    degree_b = degree_max_repetition(rpg_b)

    common_rpg = intersection(rpg_a, rpg_b)
    if len(common_rpg) == 0:  # nothing in common
        return 0., []  # no need to go further

    degree_common_rp = degree_max_repetition(common_rpg)
    # Retrieve all the longest recurrent pattern in common
    longest_common_rps = [rp for rp in common_rpg 
                          if len(rp) == degree_common_rp]
    # These two make sense independently, because one sequence
    # can be shorter and contained in the other, so the level
    # of similarity from their side can reflect this (FW).
    sim_a = degree_common_rp/degree_a
    sim_b = degree_common_rp/degree_b

    return (sim_a + sim_b) / 2, longest_common_rps
