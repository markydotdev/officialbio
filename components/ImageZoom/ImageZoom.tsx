import { styled } from '../../stitches.config';

const LargeImageBlock = styled('div', {
  zIndex: 10,
  position: 'fixed',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  backdropFilter: 'blur(4px)',
});
const LargeImage = styled('img', {
  position: 'relative',
  maxWidth: '100%',
  maxHeight: '100%',
  zIndex: 11,
});

type ImageProps = {
  imageSrc: string;
  onClick: (image) => void;
};

function ImageZoom({ imageSrc, onClick }: ImageProps) {
  return (
    <LargeImageBlock onClick={onClick}>
      <LargeImage src={imageSrc} />
    </LargeImageBlock>
  );
}

export default ImageZoom;
