"""
Utility functions for computing the n-gram-based harmonic similarity.
"""


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


def pairwise_harmonic_similarity(track_rpbag:dict, hsim_fn=ngram_hsim):
    """
    Computes the pair-wise harmonic similarity among tracks.

    Args:
        track_rpbag (dict): a dictionary mapping each track to the list
            of recurrent patterns that were extracted from the track.
        hsim_fn (function): the similarity function to consider.

    Returns:
        A dictionary mapping each couple of tracks to their harmonic
        similarity and the longest recurrent pattern they share, if any.
        If two tracks have no recurrent pattern in common, no match will
        be found in the dictionary (this is to limit space complexity).

    """
    track_ids = list(track_rpbag.keys())
    hsim_map = {track_id: {} for track_id in track_ids}

    for i, track_a in enumerate(track_ids):
        a_rpbag = track_rpbag[track_a]  # fix for now
        for j in range(i + 1, len(track_ids)):  # move ahead
            track_b = track_ids[j]
            b_rpbag = track_rpbag[track_b]
            # Compute the harmonic similarity
            hsim, longest_rps = hsim_fn(a_rpbag, b_rpbag)
            if hsim > 0.:  # save only non-trivial
                hsim_map[track_a][track_b] = hsim, longest_rps
                hsim_map[track_b][track_a] = hsim, longest_rps