import { UserT } from 'models/User.model';
import fs from 'node:fs/promises';
import { resolve } from 'node:path';

const STORAGE_PATH = resolve('storage');

class StorageService {
  async readUsers() {
    return JSON.parse(
      await fs.readFile(
        resolve(STORAGE_PATH, 'users.json'),
        {
          encoding: 'utf8',
        }
      )
    ) as Array<UserT>;
  }

  async writeUser(user: UserT) {
    const users = await this.readUsers();

    users.push(user);

    await fs.writeFile(
      resolve(STORAGE_PATH, 'users.json'),
      JSON.stringify(users)
    );
  }

  async findUser(username: string) {
    const users = await this.readUsers();

    return users.find((user) => user.username === username);
  }
}

const storage = new StorageService();

export { storage };
