# Moving Block Game
####
### Welcome to my 1st javascript game!
###
#### I hope you enjoy the game and feedback is always appreciated.


## Learning objectives
- move DOM elements on the page
- react to key-presses
- collision detection

## The Mission
Have a square that you can move using the arrow keys.
Have 4 other squares that move randomly around the screen.
When the player square hits the other squares he loses a life (3 lives) and when all his lives are gone he loses the game.
Show the time since the start how long he survived.

## controls

I changed the controls to WASD / ZQSD.
Also, the starting life is set to 5.

There are way more than 4 squares that move around! Most are bad, anything green or that does not move is good, eg: +1life.


## things I learned

- How to 
  - spawn Elements.
  - move Elements.  
  - create 'simple' collision detection.
  - write a decent README file ( I hope :sweat_smile: )  

## The result

![I made this!](https://i.gyazo.com/411e7863e8041394f2f9f6887cfa7d76.mp4)

### notes

- For collision detection I decided to keep track of every "block's" width and height and if they would touch or overlap at any point.


- I really should look into vectors and how to implement that into movement and collision.


- The movement is not smooth at all, you can only go in one direction at a time, at some point I'd like to add diagonal movement. This is likely linked to the vectors I need to look into



