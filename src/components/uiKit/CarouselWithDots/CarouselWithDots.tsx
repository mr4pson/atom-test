import Carousel, { Dots } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { memo, useState } from 'react';

type Props = {
  items: any;
  className: string;
}

const CarouselWithDots = (props: Props) => {
  const [value, setValue] = useState(0);

  const onChange = value => {
  setValue(value);
  }

  return (
    <div className={props.className}>
      <Carousel
        value={value}
        onChange={onChange}
      >
        {props.items}
      </Carousel>
      <Dots
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default memo(CarouselWithDots);