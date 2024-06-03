import random

def generate_art(width, height):
    art = []
    for _ in range(height):
        row = []
        for _ in range(width):
            # Generate a random color
            r = random.randint(0, 255)
            g = random.randint(0, 255)
            b = random.randint(0, 255)
            color = (r, g, b)
            row.append(color)
        art.append(row)
    return art

# Example usage
width = 10
height = 5
art = generate_art(width, height)
for row in art:
    for color in row:
        print(color, end=' ')
    print()