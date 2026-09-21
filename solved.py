import sys


def legacy_tuple_hash(values):
    mask = (1 << 64) - 1
    result = 0x345678
    multiplier = 1000003
    remaining = len(values)

    for value in values:
        remaining -= 1
        result = ((result ^ value) * multiplier) & mask
        multiplier = (multiplier + 82520 + 2 * remaining) & mask

    result = (result + 97531) & mask
    return result - (1 << 64) if result >= (1 << 63) else result


if __name__ == '__main__':
    values = list(map(int, sys.stdin.buffer.read().split()))
    n = values[0]
    integer_list = tuple(values[1:1 + n])
    print(legacy_tuple_hash(integer_list))

