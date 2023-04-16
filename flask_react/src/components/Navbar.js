import React, { useState } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import * as Slider from '@radix-ui/react-slider';
import classNames from 'classnames';
import { CaretDownIcon } from '@radix-ui/react-icons';
import '../styles.css';

function Navbar({setFilterValue, filterValue}) {
  const [newFilterValue, setNewFilterValue] = useState(0)
  console.log(setFilterValue)

  const handleSubmit = (event) => {
    event.preventDefault();

    setFilterValue(newFilterValue)
  }
  return (
    <NavigationMenu.Root className="NavigationMenuRoot">
      <NavigationMenu.List className="NavigationMenuList">
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="NavigationMenuTrigger">
            About <CaretDownIcon className="CaretDown" aria-hidden />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="NavigationMenuContent">
            <ul className="List one">
                <NavigationMenu.Link asChild>
                  <a className="Callout" href="/">

                    <p className="CalloutText">This high quality, exceptional product is meant for the mental wellbeing of all people. Our chief developers have concocted a revolutionary algorithm that intelligently predicts the sentiment of reddit posts and filters them according to one's emotional condition. </p>
                  </a>
                </NavigationMenu.Link>
            
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="NavigationMenuTrigger">
            Positivity Filter <CaretDownIcon className="CaretDown" aria-hidden />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="NavigationMenuContent">
            
            <ul className="slider-nav">
              Negative
              <form style={{ margin: "0em 1.3em" }} onChange={(event) => {
                setFilterValue(event.target.value);
                console.log(event.target.value)}}>
                <Slider.Root className="SliderRoot" defaultValue={[filterValue]} max={100} step={1} aria-label="Volume" name="slider">

                  <Slider.Track className="SliderTrack">
                    <Slider.Range className="SliderRange" />
                  </Slider.Track>
                  <Slider.Thumb className="SliderThumb" />
                </Slider.Root>
              </form>
              Positive
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>


        <NavigationMenu.Indicator className="NavigationMenuIndicator">
          <div className="Arrow" />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      <div className="ViewportPosition">
        <NavigationMenu.Viewport className="NavigationMenuViewport" />
      </div>
    </NavigationMenu.Root>
  );
};

const ListItem = React.forwardRef(({ className, children, title, ...props }, forwardedRef) => (
  <li>
    <NavigationMenu.Link asChild>
      <a className={classNames('ListItemLink', className)} {...props} ref={forwardedRef}>
        <div className="ListItemHeading">{title}</div>
        <p className="ListItemText">{children}</p>
      </a>
    </NavigationMenu.Link>
  </li>
));
 


export default Navbar;