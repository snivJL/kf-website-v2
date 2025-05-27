import { ImageResponse } from 'next/og';

export const alt = 'Korefocus – AI + Data + Workflows';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 72,
          background: 'white',
          color: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Korefocus
      </div>
    ),
    {
      ...size,
    }
  );
}
