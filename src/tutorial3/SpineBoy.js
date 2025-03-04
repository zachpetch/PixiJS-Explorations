import { Container } from 'pixi.js';
import { Spine } from '@esotericsoftware/spine-pixi-v8';

// Spine animation map for the character.
// name: animation track key.
// loop: false to do the animation once, true to loop it infinitely.
const animationMap = {
  idle: {
    name: 'idle',
    loop: true,
  },
  walk: {
    name: 'walk',
    loop: true,
  },
  run: {
    name: 'run',
    loop: true,
  },
  jump: {
    name: 'jump',
    timeScale: 1.5,
  },
  hover: {
    name: 'hoverboard',
    loop: true,
  },
  spawn: {
    name: 'portal',
  },
};

// Class for handling the character Spine and its animations.
export class SpineBoy
{
  constructor()
  {
    this.state = {
      walk: false,
      run: false,
      hover: false,
      jump: false,
    };

    // Create the main view.
    this.view = new Container();
    this.directionalView = new Container();

    this.spine = Spine.from({
      skeleton: 'spineSkeleton',
      atlas: 'spineAtlas',
    });

    // Add the Spine instance to the directional view.
    this.directionalView.addChild(this.spine);

    // Add the directional view to the main view.
    this.view.addChild(this.directionalView);

    // Set the default mix duration for all animations.
    // This is the duration to blend from the previous animation to the next.
    this.spine.state.data.defaultMix = 0.2;
  }

  // Play the portal-in spawn animation.
  spawn()
  {
    this.spine.state.setAnimation(0, animationMap.spawn.name);
  }

  // Play the spine animation.
  playAnimation({ name, loop = false, timeScale = 1 })
  {
    // Skip if the animation is already playing.
    if (this.currentAnimationName === name) return;

    // Play the animation on main track instantly.
    const trackEntry = this.spine.state.setAnimation(0, name, loop);

    // Apply the animation's time scale (speed).
    trackEntry.timeScale = timeScale;
  }

  update()
  {
    if (this.state.jump) this.playAnimation(animationMap.jump);
    if (this.isAnimationPlaying(animationMap.jump)) return;
    if (this.state.hover) this.playAnimation(animationMap.hover);
    else if (this.state.run) this.playAnimation(animationMap.run);
    else if (this.state.walk) this.playAnimation(animationMap.walk);
    else this.playAnimation(animationMap.idle);
  }

  isSpawning()
  {
    return this.isAnimationPlaying(animationMap.spawn);
  }

  isAnimationPlaying({ name })
  {
    // Check if the current animation on main track equals to the queried.
    // Also check if the animation is still ongoing.
    return this.currentAnimationName === name && !this.spine.state.getCurrent(0).isComplete();
  }

  // Return the name of the current animation on main track.
  get currentAnimationName()
  {
    return this.spine.state.getCurrent(0)?.animation.name;
  }

  // Return character's facing direction.
  get direction()
  {
    return this.directionalView.scale.x > 0 ? 1 : -1;
  }

  // Set character's facing direction.
  set direction(value)
  {
    this.directionalView.scale.x = value;
  }
}
