import sys


if __name__ == '__main__':
    values = list(map(int, sys.stdin.buffer.read().split()))
    n = values[0]
    integer_list = tuple(values[1:1 + n])
    print(hash(integer_list))

