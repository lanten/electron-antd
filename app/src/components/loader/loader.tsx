import React from 'react'

import './loader.less'

export const Loader: React.FC = () => {
  return (
    <svg className="app-svg-loader" fill="#fff" width={40} height={40} viewBox="0 0 100 100">
      <path d="M10 50A40 40 0 0 0 90 50A40 44 0 0 1 10 50">
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 50 52;360 50 52"
          keyTimes="0;1"
          dur="1s"
          begin="0s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  )
}
