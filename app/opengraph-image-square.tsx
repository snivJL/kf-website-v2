import { ImageResponse } from 'next/og';

export const alt = 'Korefocus – AI + Data + Orchestration';
export const size = {
  width: 1200,
  height: 1200,
};
export const contentType = 'image/png';

export default function OpenGraphImageSquare() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlSpace="preserve"
          height={1200}
          width={1200}
        >
          <style>
            {'.st0{display:none}.st4{fill:#171717}.st7{fill:#638ac7}'}
          </style>
          <g id="Layer_1">
            <path
              d="M88.9 50c-.8 1-1.2 2.3-1.2 4v5.8h7.4l-.3 2.2h-7.2v20H85V62h-4.7v-2.2H85v-5.7c0-1.6.3-3 .9-4.2.6-1.2 1.5-2.1 2.6-2.7 1.1-.6 2.4-1 3.9-1 .9 0 1.7.1 2.5.2.8.2 1.5.4 2.3.7l-.8 2.2c-.7-.2-1.4-.4-2-.6-.6-.1-1.2-.2-1.9-.2-1.6 0-2.8.5-3.6 1.5zM51.3 59.8V46.2h-6.8v24zM61 61.2l10.7-15h-8.5L44.5 74.5v8h6.8v-7.9l5.2-7.2 8.7 15.1h8.1z"
              className="st4"
            />
            <path
              d="M44.5 93.1zM97.2 93.1H46.9l-2.4 2.4h50.3z"
              className="st7"
            />
          </g>
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
