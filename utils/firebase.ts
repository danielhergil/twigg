// Firebase configuration and utilities
// This file would contain Firebase setup and helper functions

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

// Mock Firebase functions for development
export const auth = {
  signInWithEmailAndPassword: async (email: string, password: string) => {
    // Mock authentication
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            uid: 'mock-user-id',
            email,
            displayName: 'Usuario Mock',
          }
        });
      }, 1000);
    });
  },
  
  createUserWithEmailAndPassword: async (email: string, password: string) => {
    // Mock registration
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            uid: 'mock-user-id',
            email,
            displayName: 'Usuario Mock',
          }
        });
      }, 1000);
    });
  },
  
  signOut: async () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
  },
  
  onAuthStateChanged: (callback: (user: any) => void) => {
    // Mock auth state listener
    setTimeout(() => {
      callback(null); // No user initially
    }, 100);
    
    return () => {}; // Unsubscribe function
  }
};

export const firestore = {
  collection: (path: string) => ({
    doc: (id?: string) => ({
      get: async () => ({
        exists: true,
        data: () => ({}),
      }),
      set: async (data: any) => {},
      update: async (data: any) => {},
      delete: async () => {},
    }),
    add: async (data: any) => ({
      id: 'mock-doc-id',
    }),
    where: (field: string, operator: string, value: any) => ({
      get: async () => ({
        docs: [],
      }),
    }),
    orderBy: (field: string, direction?: 'asc' | 'desc') => ({
      get: async () => ({
        docs: [],
      }),
    }),
    limit: (count: number) => ({
      get: async () => ({
        docs: [],
      }),
    }),
  }),
};

export const storage = {
  ref: (path: string) => ({
    put: async (file: any) => ({
      ref: {
        getDownloadURL: async () => 'https://mock-url.com/file.jpg',
      },
    }),
    getDownloadURL: async () => 'https://mock-url.com/file.jpg',
    delete: async () => {},
  }),
};

// Helper functions
export const uploadImage = async (uri: string, path: string): Promise<string> => {
  // Mock image upload
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('https://mock-url.com/uploaded-image.jpg');
    }, 2000);
  });
};

export const createCourse = async (courseData: any): Promise<string> => {
  // Mock course creation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('mock-course-id');
    }, 1500);
  });
};

export const getUserCourses = async (userId: string): Promise<any[]> => {
  // Mock get user courses
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([]);
    }, 1000);
  });
};

export const getCourseProgress = async (userId: string, courseId: string): Promise<any> => {
  // Mock get course progress
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        progress: 0,
        currentModule: 0,
        currentLesson: 0,
      });
    }, 500);
  });
};