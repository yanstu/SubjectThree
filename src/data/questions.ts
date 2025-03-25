export interface Question {
  id: number;
  title: string;
  options: string[];
  correctAnswers: number[];
  explanation: string;
}

export const lightOptions = [
  '近光灯',
  '远光灯',
  '远近光交替',
  '左转向灯',
  '右转向灯',
  '示廓灯',
  '雾灯',
  '应急灯'
];

export const questions: Question[] = [
  {
    id: 1,
    title: "请开启前照灯",
    options: lightOptions,
    correctAnswers: [0], // 近光灯
    explanation: "在正常行车情况下，应该开启近光灯，以保证行车安全并且不影响其他驾驶员。"
  },
  {
    id: 2,
    title: "夜间进入照明良好的路口",
    options: lightOptions,
    correctAnswers: [0], // 近光灯
    explanation: "夜间进入照明良好的路口应开启近光灯，即使路况良好也需要开启灯光提示其他车辆。"
  },
  {
    id: 3,
    title: "夜间无照明路段行驶",
    options: lightOptions,
    correctAnswers: [1], // 远光灯
    explanation: "夜间在无照明的路段行驶时，应该开启远光灯，以提高能见度和行车安全。"
  },
  {
    id: 4,
    title: "夜间无照明路段且150米内有车行驶",
    options: lightOptions,
    correctAnswers: [0], // 近光灯
    explanation: "夜间在无照明的路段行驶，但150米内有车辆行驶时，应将远光灯变为近光灯，避免对向车辆驾驶员眩目。"
  },
  {
    id: 5,
    title: "夜间在大雨天行驶",
    options: lightOptions,
    correctAnswers: [0, 6, 7], // 近光灯、雾灯、应急灯
    explanation: "夜间大雨天气行驶时，应该开启近光灯、雾灯和应急灯，以增加车辆的能见度，提醒其他车辆注意。"
  },
  {
    id: 6,
    title: "雾天行驶",
    options: lightOptions,
    correctAnswers: [0, 6, 7], // 近光灯、雾灯、应急灯
    explanation: "雾天行驶时，应开启近光灯、雾灯和应急灯，远光灯在雾天会造成光线反射，反而降低能见度。"
  },
  {
    id: 7,
    title: "临时停车",
    options: lightOptions,
    correctAnswers: [5, 7], // 示廓灯、应急灯
    explanation: "临时停车时，应开启示廓灯和应急灯，提醒后方车辆注意避让，保障行车安全。"
  },
  {
    id: 8,
    title: "夜间路口左转弯",
    options: lightOptions,
    correctAnswers: [0, 3], // 近光灯、左转向灯
    explanation: "夜间路口左转弯时，应开启近光灯和左转向灯，提醒其他车辆你的转向意图。"
  },
  {
    id: 9,
    title: "夜间通过坡路拱桥",
    options: lightOptions,
    correctAnswers: [2], // 远近光交替
    explanation: "夜间通过坡路拱桥时，应使用远近光灯交替，提醒对向可能出现的车辆注意。"
  },
  {
    id: 10,
    title: "超车",
    options: lightOptions,
    correctAnswers: [2, 3], // 远近光交替、左转向灯
    explanation: "超车时，应开启左转向灯表示超车意图，同时使用远近光灯交替提醒前车。"
  },
  {
    id: 11,
    title: "近距离跟车行驶",
    options: lightOptions,
    correctAnswers: [0], // 近光灯
    explanation: "近距离跟车行驶时，应使用近光灯，避免使用远光灯造成前车后视镜反光影响前车驾驶员。"
  },
  {
    id: 12,
    title: "有路灯照明良好道路行驶",
    options: lightOptions,
    correctAnswers: [0], // 近光灯
    explanation: "在有路灯照明良好的道路行驶时，应开启近光灯，以保证行车安全并且不影响其他驾驶员。"
  },
  {
    id: 13,
    title: "通过有信号灯路口",
    options: lightOptions,
    correctAnswers: [0], // 近光灯
    explanation: "通过有信号灯的路口时，应开启近光灯，以保证行车安全并且不影响其他车辆和行人。"
  },
  {
    id: 14,
    title: "通过无信号灯路口",
    options: lightOptions,
    correctAnswers: [2], // 远近光交替
    explanation: "通过无信号灯路口时，应使用远近光灯交替，提醒路口可能出现的其他车辆和行人注意。"
  },
  {
    id: 15,
    title: "通过人行横道",
    options: lightOptions,
    correctAnswers: [2], // 远近光交替
    explanation: "通过人行横道时，应使用远近光灯交替，提醒可能穿越道路的行人注意。"
  },
  {
    id: 16,
    title: "夜间通过急弯、坡路",
    options: lightOptions,
    correctAnswers: [2], // 远近光交替
    explanation: "夜间通过急弯、坡路时，应使用远近光灯交替，提醒可能出现的车辆注意，同时提高自身的视野。"
  }
]; 