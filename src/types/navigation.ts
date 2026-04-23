export type Place = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  description: string;
  image: any;
};

export type Fact = {
  id: string;
  text: string;
  topic: 'space' | 'rockets';
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
};

export type Note = {
  id: string;
  emoji: string;
  title: string;
  text: string;
};

export type RootStackParamList = {
  Loader: undefined;
  Onboarding: undefined;
  Tabs: undefined;
  PlaceDetail: { placeId: string };
};

export type TabParamList = {
  Places: undefined;
  Map: undefined;
  Quiz: undefined;
  Facts: undefined;
  Notes: undefined;
  Saved: undefined;
};
