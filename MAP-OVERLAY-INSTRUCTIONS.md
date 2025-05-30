# Leaflet Map Overlay Instructions

This theme supports adding markers and other overlays to your Leaflet maps directly from the post content. This allows you to create interactive maps with points of interest, paths, areas, and more.

## How to Use

1. Create a post using the "Leaflet Map" template
2. Upload your map image as the feature image
3. In the post content, add a code block (using the Ghost editor's "Code" block)
4. Insert your map data in JSON format (see examples below)
5. Publish your post

The map data will be automatically parsed and the markers/overlays will be added to your map.

## JSON Format

The map data should be in a specific JSON format. Here's the general structure:

```json
{
  "markers": [...],
  "polylines": [...],
  "polygons": [...],
  "circles": [...],
  "rectangles": [...],
  "view": {...}
}
```

You can include any or all of these elements.

### Markers

```json
{
  "markers": [
    {
      "position": [y, x],
      "popup": "Optional popup text",
      "tooltip": "Optional tooltip text",
      "icon": {
        "iconUrl": "path/to/icon.png",
        "iconSize": [25, 41],
        "iconAnchor": [12, 41],
        "popupAnchor": [1, -34],
        "shadowUrl": "path/to/shadow.png",
        "shadowSize": [41, 41],
        "shadowAnchor": [12, 41]
      }
    }
  ]
}
```

The `icon` property is optional and follows Leaflet's [Icon options](https://leafletjs.com/reference.html#icon).

### Polylines

```json
{
  "polylines": [
    {
      "points": [[y1, x1], [y2, x2], [y3, x3]],
      "options": {
        "color": "red",
        "weight": 3,
        "opacity": 0.7
      }
    }
  ]
}
```

The `options` property follows Leaflet's [Polyline options](https://leafletjs.com/reference.html#polyline).

### Polygons

```json
{
  "polygons": [
    {
      "points": [[y1, x1], [y2, x2], [y3, x3]],
      "options": {
        "color": "blue",
        "fillColor": "lightblue",
        "fillOpacity": 0.5
      }
    }
  ]
}
```

The `options` property follows Leaflet's [Polygon options](https://leafletjs.com/reference.html#polygon).

### Circles

```json
{
  "circles": [
    {
      "center": [y, x],
      "radius": 100,
      "options": {
        "color": "green",
        "fillColor": "lightgreen",
        "fillOpacity": 0.5
      }
    }
  ]
}
```

The `options` property follows Leaflet's [Circle options](https://leafletjs.com/reference.html#circle).

### Rectangles

```json
{
  "rectangles": [
    {
      "bounds": [[y1, x1], [y2, x2]],
      "options": {
        "color": "purple",
        "fillColor": "lavender",
        "fillOpacity": 0.5
      }
    }
  ]
}
```

The `options` property follows Leaflet's [Rectangle options](https://leafletjs.com/reference.html#rectangle).

### Custom View

```json
{
  "view": {
    "center": [y, x],
    "zoom": 0
  }
}
```

This allows you to set a custom center point and zoom level for the map.

## Complete Example

Here's a complete example that includes multiple types of overlays:

```json
{
  "markers": [
    {
      "position": [500, 300],
      "popup": "This is a marker",
      "tooltip": "Click me!"
    },
    {
      "position": [600, 400],
      "popup": "Another marker"
    }
  ],
  "polylines": [
    {
      "points": [[500, 300], [600, 400], [700, 350]],
      "options": {
        "color": "red",
        "weight": 3
      }
    }
  ],
  "polygons": [
    {
      "points": [[400, 200], [450, 300], [350, 300]],
      "options": {
        "color": "blue",
        "fillColor": "lightblue",
        "fillOpacity": 0.5
      }
    }
  ],
  "circles": [
    {
      "center": [550, 350],
      "radius": 50,
      "options": {
        "color": "green",
        "fillColor": "lightgreen",
        "fillOpacity": 0.5
      }
    }
  ],
  "view": {
    "center": [550, 350],
    "zoom": 0
  }
}
```

## Coordinate System

The coordinate system used is based on the image dimensions:
- The origin (0,0) is at the top-left corner of the image
- The y-coordinate increases as you move down the image
- The x-coordinate increases as you move right across the image

For example, if your image is 1000x800 pixels:
- The top-left corner is [0, 0]
- The top-right corner is [0, 1000]
- The bottom-left corner is [800, 0]
- The bottom-right corner is [800, 1000]
- The center of the image is [400, 500]

## Troubleshooting

If your overlays aren't appearing:

1. Make sure your JSON is valid (you can use a tool like [JSONLint](https://jsonlint.com/) to check)
2. Check the browser console for any error messages
3. Verify that your coordinates are within the bounds of your image
4. Enable debug mode by adding `?debug=true` to the URL

