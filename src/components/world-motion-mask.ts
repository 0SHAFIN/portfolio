import { CanvasTexture, LinearFilter } from "three";

// Outlines of foreground tree canopies in the original 1536 × 1024 artwork.
// Red permits needle movement; green permits water highlights. Terrain stays black.
const canopies = [
  { top: 0, root: 178, points: [[34,0],[48,13],[46,26],[60,35],[51,41],[71,61],[57,65],[83,90],[64,94],[91,120],[74,124],[102,153],[62,175],[12,165],[0,139],[18,120],[0,105],[19,81],[5,68],[25,44],[14,37],[30,19]] },
  { top: 284, root: 612, points: [[53,284],[65,319],[78,338],[69,340],[92,370],[80,372],[111,407],[94,408],[128,443],[108,444],[148,483],[122,483],[157,521],[135,519],[166,554],[137,550],[147,582],[103,607],[48,601],[19,576],[27,553],[1,556],[24,522],[0,523],[20,488],[0,488],[19,451],[4,448],[29,406],[14,408],[36,372],[26,370],[44,337],[38,335]] },
  { top: 508, root: 751, points: [[1207,508],[1216,540],[1225,551],[1217,554],[1240,577],[1226,578],[1256,605],[1233,604],[1264,633],[1243,632],[1275,664],[1247,659],[1270,691],[1245,684],[1250,716],[1208,744],[1169,735],[1145,724],[1161,696],[1138,697],[1164,666],[1147,663],[1170,637],[1156,637],[1180,606],[1169,606],[1188,577],[1177,579],[1198,549],[1190,550]] },
  { top: 464, root: 700, points: [[1295,464],[1303,492],[1311,510],[1305,510],[1323,535],[1311,536],[1336,562],[1318,561],[1346,592],[1327,590],[1351,618],[1334,616],[1359,649],[1335,643],[1354,671],[1316,692],[1266,689],[1236,675],[1257,650],[1237,649],[1263,618],[1245,620],[1267,589],[1255,590],[1275,563],[1265,564],[1283,535],[1276,536],[1289,508],[1283,509]] },
] as const;

export function createWorldMotionMask() {
  const canvas = document.createElement("canvas");
  canvas.width = 1536;
  canvas.height = 1024;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Cannot create the tree motion mask");
  context.fillStyle = "#000";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.globalCompositeOperation = "lighter";
  for (const { points, top, root } of canopies) {
    const gradient = context.createLinearGradient(0, top, 0, root);
    gradient.addColorStop(0, "#ff0000");
    gradient.addColorStop(0.65, "#aa0000");
    gradient.addColorStop(1, "#000000");
    context.fillStyle = gradient;
    context.beginPath();
    points.forEach(([x, y], index) => {
      if (index === 0) context.moveTo(x, y);
      else context.lineTo(x, y);
    });
    context.closePath();
    context.fill();
  }
  // Narrow highlight path through the river. There is no deformation of its banks.
  context.strokeStyle = "#00ff00";
  context.lineWidth = 18;
  context.lineCap = "round";
  context.beginPath();
  context.moveTo(1010, 675);
  context.bezierCurveTo(986, 693, 1120, 694, 1085, 719);
  context.bezierCurveTo(1055, 740, 958, 733, 968, 757);
  context.bezierCurveTo(981, 776, 1074, 771, 1008, 802);
  context.bezierCurveTo(967, 820, 924, 826, 914, 849);
  context.bezierCurveTo(902, 865, 869, 872, 850, 878);
  context.stroke();
  const texture = new CanvasTexture(canvas);
  texture.minFilter = LinearFilter;
  texture.magFilter = LinearFilter;
  texture.generateMipmaps = false;
  return texture;
}
