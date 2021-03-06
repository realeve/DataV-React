import React, { useMemo } from 'react'

import PropTypes from 'prop-types'

import classnames from 'classnames'

import { deepMerge } from '@jiaminghi/charts/lib/util/index'
import { deepClone } from '@jiaminghi/c-render/lib/plugin/util'

import useAutoResize from '../../use/autoResize'

import './style.less'

const defaultColor = ['rgba(255, 255, 255, 0.3)', 'rgba(255, 255, 255, 0.3)']

const Decoration = ({ reverse = false, className, style, color = [] }) => {
  const { width, height, domRef } = useAutoResize()

  const mergedColor = useMemo(() => deepMerge(deepClone(defaultColor, true), color || []), [color])

  const classNames = useMemo(() => classnames('dv-decoration-4', className), [
    className
  ])

  return (
    <div className={classNames} style={style} ref={domRef}>
      <div
        className={`container ${reverse ? 'reverse' : 'normal'}`}
        style={
          reverse
            ? { width: `${width}px`, height: `5px` }
            : { width: `5px`, height: `${height}px` }
        }
      >
        <svg width={reverse ? width : 5} height={reverse ? 5 : height}>
          <polyline
            stroke={mergedColor[0]}
            points={reverse ? `0, 2.5 ${width}, 2.5` : `2.5, 0 2.5, ${height}`}
          />
          <polyline
            className='bold-line'
            stroke={mergedColor[1]}
            strokeWidth='3'
            strokeDasharray='20, 80'
            strokeDashoffset='-30'
            points={reverse ? `0, 2.5 ${width}, 2.5` : `2.5, 0 2.5, ${height}`}
          />
        </svg>
      </div>
    </div>
  )
}

Decoration.propTypes = {
  reverse: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  color: PropTypes.array
}

// 指定 props 的默认值：
Decoration.defaultProps = {
  reverse: false
}

export default Decoration
