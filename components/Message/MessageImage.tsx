import { styled } from '../../stitches.config';
import Image from 'next/image';

const ImageContainer = styled('div', {
  flex: 1,
  display: 'block',
  position: 'relative',
  '& + div': {
    marginLeft: '1rem',
  },
});
const StyledImage = styled(Image, {
  borderRadius: '$image',
});

function MessageImage({ url, key }) {
  return (
    <ImageContainer key={key}>
      <StyledImage
        layout='fill'
        objectFit='cover'
        objectPosition='25% 25%'
        placeholder='blur'
        blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkOAYAAMwAyBFrrNoAAAAASUVORK5CYII='
        src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${url}`}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = './missing.jpg';
        }}
        alt='image here'
      />
    </ImageContainer>
  );
}

export default MessageImage;
