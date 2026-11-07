
export type MeetingType = "sacrament" | "ward-conference" | "special";

export interface Hymn {
  title: string;
  number: number;
}

export interface SpeakerItem {
  name: string;
  topic: string;
  order: number;
}

export interface WardBusinessItem {
  title: string;
  description?: string;
}

export interface SacramentMeeting {
  id: number;
  date: string;
  time: string;
  type: MeetingType;
  presiding: string;
  conducting: string;
  openingHymn: Hymn;
  sacramentHymn: Hymn;
  closingHymn: Hymn;
  intermediateHymn?: Hymn;
  speakers: SpeakerItem[];
  wardBusiness: WardBusinessItem[];
  announcements: string[];
  isCurrent: boolean;
}
