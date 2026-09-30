import os
import sys

def migratoryBirds(arr):
    count = [0] * 5

    for bird in arr:
        count[bird - 1] += 1

    return count.index(max(count)) + 1


if __name__ == '__main__':
    data = list(map(int, sys.stdin.buffer.read().split()))
    arr_count = data[0]
    arr = data[1:arr_count + 1]
    result = migratoryBirds(arr)

    output_path = os.environ.get('OUTPUT_PATH')
    if output_path:
        with open(output_path, 'w') as fptr:
            fptr.write(str(result) + '\n')
    else:
        print(result)