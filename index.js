import 'expo-dev-client';
import { registerRootComponent } from 'expo';

import App from './App';

import { Platform } from 'react-native';
import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import schema from './src/model/schema';
import migrations from './src/model/migration';
import { Post } from './src/model/Post.model';
import { Blog } from './src/model/Blog.model';
import { Comment } from './src/model/Comment.model';
// import Post from './model/Post' // ⬅️ You'll import your Models here

// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
  schema,
  migrations,
  onSetUpError: (error) => {
    console.log('here');
    // Database failed to load -- offer the user to reload the app or log out
  },
});

// Then, make a Watermelon database from it!
export const database = new Database({
  adapter,
  modelClasses: [Blog, Post, Comment],
});
// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
