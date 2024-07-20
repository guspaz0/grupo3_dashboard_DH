/*

+-----------------------------------------------------------------+
|     Created by Chirag Mehta - http://chir.ag/projects/ntc       |
|-----------------------------------------------------------------|
|               ntc js (Name that Color JavaScript)               |
+-----------------------------------------------------------------+

All the functions, code, lists etc. have been written specifically
for the Name that Color JavaScript by Chirag Mehta unless otherwise
specified.

This script is released under the: Creative Commons License:
Attribution 2.5 http://creativecommons.org/licenses/by/2.5/

Sample Usage:

  <script type="text/javascript" src="ntc.js"></script>

  <script type="text/javascript">

    var n_match  = ntc.name("#6195ED");
    n_rgb        = n_match[0]; // This is the RGB value of the closest matching color
    n_name       = n_match[1]; // This is the text string for the name of the match
    n_exactmatch = n_match[2]; // True if exact color match, False if close-match

    alert(n_match);

  </script>

*/

var ntc = {

    init: function() {
      var color, rgb, hsl;
      for(var i = 0; i < ntc.names.length; i++)
      {
        color = "#" + ntc.names[i][0];
        rgb = ntc.rgb(color);
        hsl = ntc.hsl(color);
        ntc.names[i].push(rgb[0], rgb[1], rgb[2], hsl[0], hsl[1], hsl[2]);
      }
    },
  
    name: function(color) {
  
      color = color.toUpperCase();
      if(color.length < 3 || color.length > 7)
        return ["#000000", "Invalid Color: " + color, false];
      if(color.length % 3 == 0)
        color = "#" + color;
      if(color.length == 4)
        color = "#" + color.substr(1, 1) + color.substr(1, 1) + color.substr(2, 1) + color.substr(2, 1) + color.substr(3, 1) + color.substr(3, 1);
  
      var rgb = ntc.rgb(color);
      var r = rgb[0], g = rgb[1], b = rgb[2];
      var hsl = ntc.hsl(color);
      var h = hsl[0], s = hsl[1], l = hsl[2];
      var ndf1 = 0; ndf2 = 0; ndf = 0;
      var cl = -1, df = -1;
  
      for(var i = 0; i < ntc.names.length; i++)
      {
        if(color == "#" + ntc.names[i][0])
          return ["#" + ntc.names[i][0], ntc.names[i][1], true];
  
        ndf1 = Math.pow(r - ntc.names[i][2], 2) + Math.pow(g - ntc.names[i][3], 2) + Math.pow(b - ntc.names[i][4], 2);
        ndf2 = Math.pow(h - ntc.names[i][5], 2) + Math.pow(s - ntc.names[i][6], 2) + Math.pow(l - ntc.names[i][7], 2);
        ndf = ndf1 + ndf2 * 2;
        if(df < 0 || df > ndf)
        {
          df = ndf;
          cl = i;
        }
      }
  
      return (cl < 0 ? ["#000000", "Invalid Color: " + color, false] : ["#" + ntc.names[cl][0], ntc.names[cl][1], false]);
    },
  
    // adopted from: Farbtastic 1.2
    // http://acko.net/dev/farbtastic
    hsl: function (color) {
  
      var rgb = [parseInt('0x' + color.substring(1, 3)) / 255, parseInt('0x' + color.substring(3, 5)) / 255, parseInt('0x' + color.substring(5, 7)) / 255];
      var min, max, delta, h, s, l;
      var r = rgb[0], g = rgb[1], b = rgb[2];
  
      min = Math.min(r, Math.min(g, b));
      max = Math.max(r, Math.max(g, b));
      delta = max - min;
      l = (min + max) / 2;
  
      s = 0;
      if(l > 0 && l < 1)
        s = delta / (l < 0.5 ? (2 * l) : (2 - 2 * l));
  
      h = 0;
      if(delta > 0)
      {
        if (max == r && max != g) h += (g - b) / delta;
        if (max == g && max != b) h += (2 + (b - r) / delta);
        if (max == b && max != r) h += (4 + (r - g) / delta);
        h /= 6;
      }
      return [parseInt(h * 255), parseInt(s * 255), parseInt(l * 255)];
    },
  
    // adopted from: Farbtastic 1.2
    // http://acko.net/dev/farbtastic
    rgb: function(color) {
      return [parseInt('0x' + color.substring(1, 3)), parseInt('0x' + color.substring(3, 5)),  parseInt('0x' + color.substring(5, 7))];
    },
  
    names: [
        [
            "000000",
            "Black"
        ],
        [
            "0000C8",
            "Dark Blue"
        ],
        [
            "0000FF",
            "Blue"
        ],
        [
            "003366",
            "Midnight Blue"
        ],
        [
            "008080",
            "Teal"
        ],
        [
            "00FF00",
            "Green"
        ],
        [
            "00FF7F",
            "Spring Green"
        ],
        [
            "00FFFE",
            "Aqua"
        ],
        [
            "00FFFF",
            "Cyan"
        ],
        [
            "1E90FF",
            "Dodger Blue"
        ],
        [
            "228B22",
            "Forest Green"
        ],
        [
            "240A40",
            "Violet"
        ],
        [
            "2E8B57",
            "Sea Green"
        ],
        [
            "30D5C8",
            "Turquoise"
        ],
        [
            "315BA1",
            "Azure"
        ],
        [
            "370202",
            "Chocolate"
        ],
        [
            "4169E1",
            "Royal Blue"
        ],
        [
            "4682B4",
            "Steel Blue"
        ],
        [
            "4F69C6",
            "Indigo"
        ],
        [
            "583401",
            "Saddle Brown"
        ],
        [
            "6456B7",
            "Blue Violet"
        ],
        [
            "6495ED",
            "Cornflower Blue"
        ],
        [
            "660099",
            "Purple"
        ],
        [
            "6B8E23",
            "Olive Drab"
        ],
        [
            "708090",
            "Slate Gray"
        ],
        [
            "76D7EA",
            "Sky Blue"
        ],
        [
            "7FFF00",
            "Chartreuse"
        ],
        [
            "7FFFD4",
            "Aquamarine"
        ],
        [
            "800000",
            "Maroon"
        ],
        [
            "808000",
            "Olive"
        ],
        [
            "808080",
            "Gray"
        ],
        [
            "843179",
            "Plum"
        ],
        [
            "9370DB",
            "Medium Purple"
        ],
        [
            "964B00",
            "Brown"
        ],
        [
            "A9B2C3",
            "Cadet Blue"
        ],
        [
            "ADFF2F",
            "Green Yellow"
        ],
        [
            "B0E0E6",
            "Powder Blue"
        ],
        [
            "B57EDC",
            "Lavender"
        ],
        [
            "BFFF00",
            "Lime"
        ],
        [
            "C0C0C0",
            "Silver"
        ],
        [
            "C5E17A",
            "Yellow Green"
        ],
        [
            "D2B48C",
            "Tan"
        ],
        [
            "D8BFD8",
            "Thistle"
        ],
        [
            "DA70D6",
            "Orchid"
        ],
        [
            "DC143C",
            "Crimson"
        ],
        [
            "F0E68C",
            "Khaki"
        ],
        [
            "F0F8FF",
            "Alice Blue"
        ],
        [
            "F1F1F1",
            "Seashell"
        ],
        [
            "F4A460",
            "Sandy brown"
        ],
        [
            "F5DEB3",
            "Wheat"
        ],
        [
            "F5F5DC",
            "Beige"
        ],
        [
            "FAF0E6",
            "Linen"
        ],
        [
            "FCD667",
            "Goldenrod"
        ],
        [
            "FDF5E6",
            "Old Lace"
        ],
        [
            "FF0000",
            "Red"
        ],
        [
            "FF00FE",
            "Magenta"
        ],
        [
            "FF00FF",
            "Fuchsia"
        ],
        [
            "FF681F",
            "Orange"
        ],
        [
            "FF69B4",
            "Hot Pink"
        ],
        [
            "FF7F50",
            "Coral"
        ],
        [
            "FF8C69",
            "Salmon"
        ],
        [
            "FFC0CB",
            "Pink"
        ],
        [
            "FFD700",
            "Gold"
        ],
        [
            "FFDEAD",
            "Navajo White"
        ],
        [
            "FFEFD5",
            "Papaya Whip"
        ],
        [
            "FFF0F5",
            "Lavender blush"
        ],
        [
            "FFFACD",
            "Lemon Chiffon"
        ],
        [
            "FFFF00",
            "Yellow"
        ],
        [
            "FFFFF0",
            "Ivory"
        ],
        [
            "FFFFFF",
            "White"
        ],
        [
            "FAEBD7",
            "AntiqueWhite"
        ],
        [
            "FFE4C4",
            "Bisque"
        ],
        [
            "FFEBCD",
            "BlanchedAlmond"
        ],
        [
            "DEB887",
            "BurlyWood"
        ],
        [
            "FFF8DC",
            "Cornsilk"
        ],
        [
            "008B8B",
            "DarkCyan"
        ],
        [
            "B8860B",
            "DarkGoldenRod"
        ],
        [
            "A9A9A9",
            "DarkGray"
        ],
        [
            "A9A9A9",
            "DarkGrey"
        ],
        [
            "006400",
            "DarkGreen"
        ],
        [
            "BDB76B",
            "DarkKhaki"
        ],
        [
            "8B008B",
            "DarkMagenta"
        ],
        [
            "556B2F",
            "DarkOliveGreen"
        ],
        [
            "FF8C00",
            "DarkOrange"
        ],
        [
            "9932CC",
            "DarkOrchid"
        ],
        [
            "8B0000",
            "DarkRed"
        ],
        [
            "E9967A",
            "DarkSalmon"
        ],
        [
            "8FBC8F",
            "DarkSeaGreen"
        ],
        [
            "483D8B",
            "DarkSlateBlue"
        ],
        [
            "2F4F4F",
            "DarkSlateGray"
        ],
        [
            "2F4F4F",
            "DarkSlateGrey"
        ],
        [
            "00CED1",
            "DarkTurquoise"
        ],
        [
            "9400D3",
            "DarkViolet"
        ],
        [
            "FF1493",
            "DeepPink"
        ],
        [
            "00BFFF",
            "DeepSkyBlue"
        ],
        [
            "696969",
            "DimGray"
        ],
        [
            "696969",
            "DimGrey"
        ],
        [
            "B22222",
            "FireBrick"
        ],
        [
            "FFFAF0",
            "FloralWhite"
        ],
        [
            "DCDCDC",
            "Gainsboro"
        ],
        [
            "F8F8FF",
            "GhostWhite"
        ],
        [
            "808080",
            "Grey"
        ],
        [
            "F0FFF0",
            "HoneyDew"
        ],
        [
            "CD5C5C",
            "IndianRed"
        ],
        [
            "7CFC00",
            "LawnGreen"
        ],
        [
            "ADD8E6",
            "LightBlue"
        ],
        [
            "F08080",
            "LightCoral"
        ],
        [
            "E0FFFF",
            "LightCyan"
        ],
        [
            "FAFAD2",
            "LightGoldenRodYellow"
        ],
        [
            "D3D3D3",
            "LightGray"
        ],
        [
            "D3D3D3",
            "LightGrey"
        ],
        [
            "90EE90",
            "LightGreen"
        ],
        [
            "FFB6C1",
            "LightPink"
        ],
        [
            "FFA07A",
            "LightSalmon"
        ],
        [
            "20B2AA",
            "LightSeaGreen"
        ],
        [
            "87CEFA",
            "LightSkyBlue"
        ],
        [
            "778899",
            "LightSlateGray"
        ],
        [
            "778899",
            "LightSlateGrey"
        ],
        [
            "B0C4DE",
            "LightSteelBlue"
        ],
        [
            "FFFFE0",
            "LightYellow"
        ],
        [
            "32CD32",
            "LimeGreen"
        ],
        [
            "66CDAA",
            "MediumAquaMarine"
        ],
        [
            "0000CD",
            "MediumBlue"
        ],
        [
            "BA55D3",
            "MediumOrchid"
        ],
        [
            "3CB371",
            "MediumSeaGreen"
        ],
        [
            "7B68EE",
            "MediumSlateBlue"
        ],
        [
            "00FA9A",
            "MediumSpringGreen"
        ],
        [
            "48D1CC",
            "MediumTurquoise"
        ],
        [
            "C71585",
            "MediumVioletRed"
        ],
        [
            "F5FFFA",
            "MintCream"
        ],
        [
            "FFE4E1",
            "MistyRose"
        ],
        [
            "FFE4B5",
            "Moccasin"
        ],
        [
            "000080",
            "Navy"
        ],
        [
            "FF4500",
            "OrangeRed"
        ],
        [
            "EEE8AA",
            "PaleGoldenRod"
        ],
        [
            "98FB98",
            "PaleGreen"
        ],
        [
            "AFEEEE",
            "PaleTurquoise"
        ],
        [
            "DB7093",
            "PaleVioletRed"
        ],
        [
            "FFDAB9",
            "PeachPuff"
        ],
        [
            "CD853F",
            "Peru"
        ],
        [
            "663399",
            "RebeccaPurple"
        ],
        [
            "BC8F8F",
            "RosyBrown"
        ],
        [
            "A0522D",
            "Sienna"
        ],
        [
            "6A5ACD",
            "SlateBlue"
        ],
        [
            "708090",
            "SlateGrey"
        ],
        [
            "FFFAFA",
            "Snow"
        ],
        [
            "FF6347",
            "Tomato"
        ],
        [
            "F5F5F5",
            "WhiteSmoke"
        ]
    ]
  
  }
  
  ntc.init();