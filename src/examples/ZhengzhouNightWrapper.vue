<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';
import * as terra from '@terra.gl/core';

const mapContainer = ref<HTMLElement | null>(null);
let map: terra.Map | null = null;

onMounted(() => {
  if (!mapContainer.value) return;

  // 1. 初始化地图
  map = new terra.Map(mapContainer.value, {
    center: [113.55175280557246, 34.793170730802366, 2000],
    viewer: {
      debug: false,
      antialias: true,
      polarDeg: 70,
      azimuthDeg: 0,
      skybox: {
        path: "/image/skyboxall/onemap/",
        files: ["posx.jpg", "negx.jpg", "posy.jpg", "negy.jpg", "posz.jpg", "negz.jpg"],
        defaultColor: '#121E3A'
      }
    },
    basemap: {
      Baselayers: [
        // new terra.WMTSTileLayer("base-layer", {
        //   // 注意：原示例使用了内网IP (192.168.88.31)，这里替换为公网底图以确保示例可用
        //   // 如果您有权访问该内网服务，请改回原链接
        //   source: new terra.WMTSSource({
        //     urlTemplate: "https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
        //     minLevel: 0,
        //     maxLevel: 19,
        //     attribution: "Dark"
        //   }),
        //   projection: terra.ProjectFactory.createFromID("3857", 0),
        //   layerName: "dark-layer",
        //   style: "default",
        //   matrixSet: "EPSG:3857",
        //   minLevel: 2,
        //   maxLevel: 18,
        // }),
      ],
    },
  });

  // 2. 加载数据
  addModelBuild();
  loadgeojsonpolygon('/geojson/水系.json', '#ccccc');
  loadgeojsonpipe('/geojson/public.gsgx_pipe.json', '#0068F8');
  loadgeojsonpipe('/geojson/public.wsgx_pipe.json', '#f85700');
  loadlight('/geojson/public.gsss_fireplug.json', 'lightlayer');
  loadEqu();
});

// 模型构建
function addModelBuild() {
  if (!map) return;

  let modelLayer = new terra.PointLayer('modelLayer', { isSceneLayer: true });
  map.addLayer(modelLayer);

  // 加载模型1
  for (let i = 0; i < 1; i++) {
    let featuremodel1 = new terra.Model({
      geometry: {
        coordinates: [113.55175280557246, 34.793170730802366, 1],
        type: "Point"
      },
      // @ts-ignore - iscity is not in type definition
      iscity: true,
      style: {
        // @ts-ignore - type 'gltf' is not standard
        type: 'fbx',
        url: '/model/52603.FBX',
        scale: { x: 0.01, y: 0.01, z: 0.01 } as any, // Type mismatch workaround
        // @ts-ignore
        shadows: { cast: true, receive: true },
        dracoOptions: { enable: false, decoderPath: '/draco/' }
      } as any
    });
    featuremodel1.addTo(modelLayer);
    // @ts-ignore
    if (featuremodel1.setShadows) featuremodel1.setShadows({ cast: true, receive: true });
  }

  // // 加载模型2
  // let featuremodel2 = new terra.Model({
  //   geometry: {
  //     coordinates: [113.57518999057402, 34.841657213727956, 1],
  //     type: "Point"
  //   },
  //   // @ts-ignore
  //   iscity: true,
  //   style: {
  //     // @ts-ignore
  //     type: 'gltf',
  //     url: '/model/郑州_tree1(1).glb',
  //     scale: { x: 1, y: 1, z: 1 } as any,
  //     // @ts-ignore
  //     shadows: { cast: true, receive: true },
  //     dracoOptions: { enable: true, decoderPath: '/draco/' }
  //   } as any
  // });
  // featuremodel2.addTo(modelLayer);
  // // @ts-ignore
  // if (featuremodel2.setShadows) featuremodel2.setShadows({ cast: true, receive: true });
}

// 加载管线
function loadgeojsonpipe(url: string, color: string) {
  if (!map) return;

  let lineLayer = new terra.LineLayer('pipeline' + Math.random());
  map.addLayer(lineLayer);

  fetch(url)
    .then(res => res.json())
    .then(data => {
      data.features.forEach((feature: any) => {
        if (feature.geometry && feature.geometry.coordinates) {
          // 数据预处理逻辑
          if (feature.geometry && feature.geometry.type === 'MultiLineString') {
            const coordinates = feature.geometry.coordinates;
            if (coordinates.length === 1) {
              feature = {
                ...feature,
                geometry: { type: 'LineString', coordinates: coordinates[0] }
              }
            }
          }

          // 添加 Z 坐标
          feature.geometry.coordinates = feature.geometry.coordinates.map(
            (coordArray: any) => {
              if (typeof coordArray[0] === 'number') {
                return [...coordArray, 1];
              }
              return coordArray.map((coord: any) => {
                if (typeof coord[0] === 'number') {
                  return [...coord, 1];
                }
                return coord.map((c: any) => [...c, 1]);
              });
            }
          );
        }

        let pipeline = new terra.MultiLineString({
          geometry: feature.geometry,
          style: {
            type: 'basic-line',
            color: color,
            width: 2,
          }
        });
        pipeline.addTo(lineLayer);
      });
    })
    .catch(err => {
      console.error('加载geojson失败:', err);
    });
}

// 加载水系多边形
function loadgeojsonpolygon(url: string, color: string) {
  if (!map) return;

  let waterpolygonLayer = new terra.PolygonLayer('waterpolygon', { isSceneLayer: true, altitude: 1 });
  map.addLayer(waterpolygonLayer);

  fetch(url)
    .then(res => res.json())
    .then(data => {
      data.features.forEach((feature: any) => {
        if (feature.geometry && feature.geometry.coordinates) {
          const geometry = feature.geometry;
          // 调试：打印坐标结构
          // console.log('Water polygon original coords:', geometry.coordinates);

          const currentZ = 1;

          // 修正坐标转换逻辑：GeoJSON Polygon coordinates 是 [ring1, ring2...]，每个 ring 是 [pt1, pt2...]
          // 我们需要保持这个嵌套结构，只是给每个点增加 Z 值
          if (geometry.type === 'Polygon') {
            // 递归处理，因为有些可能是 MultiPolygon 或者嵌套更深
            // 但标准 Polygon 是 Array<Array<[number, number]>>

            // 简单处理标准 Polygon
            if (Array.isArray(geometry.coordinates[0][0])) {
              geometry.coordinates = geometry.coordinates.map((ring: any[]) =>
                ring.map((coord: any[]) => [coord[0], coord[1], currentZ])
              );
            }
          } else if (geometry.type === 'MultiPolygon') {
            // MultiPolygon 是 Array<Polygon>
            geometry.coordinates = geometry.coordinates.map((polygon: any[]) =>
              polygon.map((ring: any[]) =>
                ring.map((coord: any[]) => [coord[0], coord[1], currentZ])
              )
            );
          }
        }
        const water = new terra.Polygon({
          geometry: feature.geometry,
          style: {
            // @ts-ignore - 'base-water' might not be in types
            type: 'base-water',
            normalMap: '/image/waternormals.jpg', // 需确保资源存在
            color: '#0c99e5',
            sunColor: '#FF0597',
            opacity: 0.5
          } as any
        });
        water.addTo(waterpolygonLayer);
      });
    })
    .catch(err => {
      console.error('加载geojson失败:', err);
    });
}

// 加载灯光点
function loadlight(url: string, layername: string) {
  if (!map) return;

  let pointLayer = new terra.PointLayer(layername);
  map.addLayer(pointLayer);

  fetch(url)
    .then(res => res.json())
    .then(data => {
      data.features.forEach((feature: any) => {
        if (feature.geometry && feature.geometry.coordinates) {
          feature.geometry.coordinates = [...feature.geometry.coordinates, 1];
        }
      });

      const geometries = data.features.map((item: any) => {
        return item.geometry;
      });

      // @ts-ignore - TPoints might not be exported in types or renamed
      const lights = new (terra as any).TPoints({
        geometry: {
          type: 'Point',
          coordinates: [113.66547375795346, 34.75655850019979],
        },
        geometries: geometries,
        style: {
          type: 'light',
          color: '#000000',
          icon: '/image/lensflare2_alpha.png',
        }
      });
      lights.addTo(pointLayer);
    })
    .catch(err => {
      console.error('加载geojson失败:', err);
    });
}

// 加载设施点
function loadgeojsonpoint(url: string, icon: string, layername: string) {
  if (!map) return;

  let pointLayer = new terra.PointLayer(layername, { collision: true });
  map.addLayer(pointLayer);

  fetch(url)
    .then(res => res.json())
    .then(data => {
      data.features.forEach((feature: any) => {
        if (feature.geometry && feature.geometry.coordinates) {
          feature.geometry.coordinates = [...feature.geometry.coordinates, 1];
        }

        let featurepoint = new terra.Maker({
          geometry: feature.geometry,
          style: {
            type: 'icon-point',
            url: icon,
            size: [0.03, 0.03],
            rotation: Math.PI / 4,
            anchor: [0, 0],
            zIndex: 10,
            sizeAttenuation: false
          } as any
        });
        featurepoint.addTo(pointLayer);
      });
    })
    .catch(err => {
      console.error('加载geojson失败:', err);
    });
}

function loadEqu() {
  let points = [
    "public.gsss_valve.json",
  ];

  for (let i = 0; i < points.length; i++) {
    const element = points[i];
    loadgeojsonpoint('/geojson/' + element, '/image/point/fxd.png', element);
  }
}

onBeforeUnmount(() => {
  if (map) {
    if (typeof map.dispose === 'function') map.dispose();
    map = null;
  }
});
</script>

<template>
  <div class="relative w-full h-full">
    <div ref="mapContainer" class="w-full h-full bg-gray-900"></div>

    <!-- Legend / Info Panel -->
    <div
      class="absolute top-4 right-4 bg-gray-800/80 backdrop-blur p-4 rounded-lg shadow-lg border border-gray-700 max-w-xs">
      <h3 class="text-white font-bold mb-3 border-b border-gray-600 pb-2">郑州夜景演示</h3>
      <div class="space-y-2 text-sm text-gray-300">
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-[#0068F8]"></span>
          <span>供水管线</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-[#f85700]"></span>
          <span>污水管线</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-[#0c99e5]"></span>
          <span>水系</span>
        </div>
        <div class="flex items-center gap-2">
          <img src="/image/point/fxd.png" class="w-4 h-4 object-contain" />
          <span>设施点</span>
        </div>
      </div>
    </div>
  </div>
</template>
