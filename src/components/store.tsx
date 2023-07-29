import { create } from 'zustand';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
  accessToken: string;
  role: 'ADMIN' | 'TEACHER' | 'PARENT';
  email: string;
  createdAt: Date;
  updatedAt: Date;
  archived: boolean;
  students: Student[];
};

export type Student = {
  id: number;
  firstName: string;
  lastName: string;
  grade: string;
  parentId: number;
  parent: User;
  createdAt: Date;
  updatedAt: Date;
  archived: boolean;
  events: Event[];
};

type Teacher = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  archived: boolean;
  events: Event[];
};

export type Event = {
  id: number;
  name: string;
  description: string;
  startTime: Date;
  endTime: Date;
  attendees: string[];
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  archived: boolean;
  teacherId?: number;
  teacher?: Teacher;
  studentId?: number;
  student?: Student;
  comments: Comment[];
};

export type Comment = {
  id: number;
  text: string;
  eventId: number;
  event: Event;
  createdAt: Date;
  updatedAt: Date;
  archived: boolean;
};

export interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// const ipAddress: string = '172.16.68.140';
const ipAddress: string = '192.168.0.171';

type AppState = {
  users: User[];
  students: Student[];
  teachers: Teacher[];
  events: Event[];
  comments: Comment[];
  loggedInUser: User | null;
  updateUser: (userId: number, updatedUser: Partial<User>) => void;
  updateStudent: (studentId: number, updatedStudent: Partial<Student>) => void;
  updateTeacher: (teacherId: number, updatedTeacher: Partial<Teacher>) => void;
  updateEvent: (eventId: number, updatedEvent: Partial<Event>) => void;
  addComment: (eventId: number, comment: Comment) => void;
  signIn: (email: string, password: string) => Promise<User | null>;
  signUp: (user: Omit<User, 'id'>) => Promise<User> | Promise<FormValues>;
};

export const useStore = create<AppState>((set) => ({
  users: [],
  students: [],
  teachers: [],
  events: [],
  comments: [],
  loggedInUser: null,
  
  updateUser: (userId, updatedUser) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === userId ? { ...user, ...updatedUser } : user
      ),
    })),
  updateStudent: (studentId, updatedStudent) =>
    set((state) => ({
      students: state.students.map((student) =>
        student.id === studentId ? { ...student, ...updatedStudent } : student
      ),
    })),
  updateTeacher: (teacherId, updatedTeacher) =>
    set((state) => ({
      teachers: state.teachers.map((teacher) =>
        teacher.id === teacherId ? { ...teacher, ...updatedTeacher } : teacher
      ),
    })),
  updateEvent: (eventId, updatedEvent) =>
    set((state) => ({
      events: state.events.map((event) =>
        event.id === eventId ? { ...event, ...updatedEvent } : event
      ),
    })),
  addComment: (eventId, comment) =>
    set((state) => ({
      comments: [...state.comments, comment],
      events: state.events.map((event) =>
        event.id === eventId ? { ...event, comments: [...event.comments, comment] } : event
      ),
    })),
  signIn: async (email, password) => {
    try {
      const response = await axios.post<User>(`http://${ipAddress}:3000/api/login`, {
        email,
        password,
      });
      const user = response.data;
      const { accessToken } = response.data; 
      AsyncStorage.setItem('loggedInUser', JSON.stringify(user));
      set({ loggedInUser: user });
      AsyncStorage.setItem('AccessToken', accessToken);
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  signUp: async (user) => {
    try {
      const response = await axios.post<User>(`http://${ipAddress}:3000/api/register`, user);
      const newUser = response.data;
      return newUser;
    } catch (error) {
      console.error(error);
      throw new Error('Error creating user');
    }
  },
}));
