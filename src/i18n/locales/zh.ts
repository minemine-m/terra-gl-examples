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
    backToHome: '返回首页',
    categories: {
      mapControl: '地图控制',
      layers: '图层',
      geometryInteraction: '几何与交互',
      advancedVisuals: '高级视觉'
    }
  },
  examples: {
    terrain3d: {
      title: '3D 地形',
      description: '使用高程数据渲染 3D 地形。使用右键或 Ctrl+拖拽来倾斜相机。'
    },
    cameraControl: {
      title: '相机控制',
      description: '控制相机飞行、旋转和视角切换。'
    },
    layerManagement: {
      title: '图层管理',
      description: '添加、移除图层，控制图层可见性。'
    },
    uiComponents: {
      title: 'UI 组件',
      description: '信息窗体 (InfoWindow) 和 自定义 HTML 标记 (UIMarker)。'
    },
    pipelineNetwork: {
      title: '地下管网',
      description: '加载并展示城市地下管网 GeoJSON 数据，包含管线和阀门设备。'
    },
    realisticWater: {
      title: '真实水面',
      description: '使用法线贴图和反射效果渲染逼真的水面效果。'
    },
    volumetricClouds: {
      title: '体积云',
      description: '在空中生成动态的体积云层效果。'
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
    },
    labelExample: {
      title: '文本标注',
      description: '在地图上显示和自定义文本标签。',
      panelTitle: '标注控制',
      content: '内容',
      size: '大小',
      textColor: '文本颜色',
      bgColor: '背景颜色',
      rotation: '旋转',
      background: '背景框'
    },
    markerStyles: {
      title: '标记样式',
      description: '展示不同的标记样式，如图标标记和基础圆点标记。',
      panelTitle: '标记控制',
      flyTo: '定位',
      resize: '缩放',
      color: '换色',
      iconMarker: '图标标记',
      redCircle: '红色圆点',
      blueDot: '蓝色圆点',
      clickTip: '* 点击“定位”导航并打开弹窗'
    },
    geometryStyles: {
      title: '几何样式',
      description: '展示线和多边形的各种样式配置。',
      panelTitle: '样式控制',
      cyanLine: '青色线条',
      greenPolygon: '绿色多边形',
      width: '宽度',
      color: '颜色',
      opacity: '透明度',
      borderWidth: '边框宽度'
    },
    modelLayer: {
      title: '3D 模型',
      description: '在地图上加载并渲染 3D GLTF 模型。',
      panelTitle: '模型控制',
      duckModel: '小黄鸭',
      cesiumMan: 'Cesium 小人',
      scale: '缩放',
      rotation: '旋转'
    },
    layerOperations: {
      title: '图层操作',
      description: '通过 ID 动态添加、移除和切换图层。',
      panelTitle: '图层操作',
      addRandomLayer: '添加随机图层',
      toggleLast: '显隐最后图层',
      removeLast: '移除最后图层',
      operationLogs: '操作日志',
      noOperationsYet: '暂无操作记录'
    },
    layerProperties: {
      title: '图层属性',
      description: '实时调整图层的透明度和高度（海拔）。',
      panelTitle: '图层属性',
      opacity: '透明度',
      altitude: '海拔高度'
    }
  },
  viewer: {
    preview: '预览',
    code: '代码',
    copy: '复制',
    copied: '已复制!'
  }
}
