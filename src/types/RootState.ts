export interface ConversationState {
  showConversationBox: boolean;
  name?: string;
  namePosition?: 'left' | 'right' | 'middle';
  text: string;
}

export const defaultConversationState: ConversationState = {
  showConversationBox: false,
  text: '',
};

export interface DirectorState {
  script: string;
  line: number;
  breakpoint?: DirectorState;
}

export const defaultDirectorState: DirectorState = {
  script: 'intro',
  line: 0,
};

export interface Geolocation {
  latitude: number;
  longitude: number;
  altitude?: number;
}

export interface DetectorState {
  showSharkDetector: boolean;
  targetGeolocation?: Geolocation;
}

export const defaultDetectorState: DetectorState = {
  showSharkDetector: false,
};

export interface RootState {
  conversation: ConversationState;
  director: DirectorState;
  detector: DetectorState;
}

export const defaultRootState = {
  conversation: defaultConversationState,
  director: defaultDirectorState,
  detector: defaultDetectorState,
};
