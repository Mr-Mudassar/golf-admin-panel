export type Route = {
  path: string;
  isPublic: boolean;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  // role?: 'USER' | 'ADMIN'
};
