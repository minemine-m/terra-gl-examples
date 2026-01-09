export default {
  nav: {
    home: '首页',
    examples: '示例'
  },
  home: {
    title: 'Terra-GL',
    subtitle: '强大的 Web 3D 地图引擎',
    description: '轻松构建高性能、沉浸式的 3D 地理可视化应用。Terra-GL 利用 WebGL 在浏览器中直接渲染海量地形和地图数据。',
    getStarted: '开始使用',
    examplesTitle: '浏览示例',
    examplesSubtitle: '通过这些交互式演示探索 Terra-GL 的无限可能。',
    viewExample: '查看示例'
  },
  sidebar: {
    title: 'Terra-GL',
    subtitle: '示例库',
    footer: "基于 {'@'}terra.gl/core",
    backToHome: '返回首页'
  },
  examples: {
    terrain3d: {
      title: '3D 地形',
      description: '使用高程数据渲染 3D 地形。使用右键或 Ctrl+拖拽来倾斜相机。'
    },
    basicMap: {
      title: '基础地图',
      description: '使用 OpenStreetMap 栅格瓦片的简单 2D 地图。'
    },
    mapEvents: {
      title: '地图事件',
      description: '监听并处理点击、双击、缩放、移动等地图交互事件。',
      panelTitle: '事件日志',
      placeholder: '与地图交互以查看事件...'
    },
    tileLayer: {
      title: '瓦片图层切换',
      description: '在不同的底图服务（暗色、亮色、卫星图）之间进行切换。',
      panelTitle: '底图图层',
      layers: {
        dark: 'Carto 暗色',
        light: 'Carto 亮色',
        osm: 'OpenStreetMap',
        satellite: 'ArcGIS 卫星图'
      }
    },
    markerExample: {
      title: '标记与弹窗',
      description: '在地图上添加图标标记，并配置自定义样式的点击弹窗。'
    },
    vectorShapes: {
      title: '矢量图形',
      description: '绘制多边形和线要素，展示矢量图层的基本用法。'
    },
    drawTool: {
      title: '绘制工具',
      description: '交互式绘制点、线、面，并获取绘制结果。',
      panelTitle: '绘制工具',
      mode: {
        polygon: '多边形',
        line: '线',
        point: '点'
      },
      clear: '清空全部'
    }
  },
  viewer: {
    preview: '预览',
    code: '代码',
    copy: '复制',
    copied: '已复制!'
  }
}
