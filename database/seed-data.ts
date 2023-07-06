interface SeedData{
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}


export const seedData = {
  entries: [
    {
      description: 'Pendiente: Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem, accusantium doloribus! Vero delectus impedit aspernatur totam expedita suscipit laboriosam, laborum quis, recusandae dolorem modi hic nostrum iure a, animi consequuntur.',
      status: 'pending',
      createdAt: Date.now()
    },
    {
      description: 'In-progress: Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem, accusantium doloribus! Vero delectus impedit aspernatur totam expedita suscipit laboriosam, laborum quis, recusandae dolorem modi hic nostrum iure a, animi consequuntur.',
      status: 'in-progress',
      createdAt: Date.now() - 1000000
    },
    {
      description: 'Terminadas: Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem, accusantium doloribus! Vero delectus impedit aspernatur totam expedita suscipit laboriosam, laborum quis, recusandae dolorem modi hic nostrum iure a, animi consequuntur.',
      status: 'finished',
      createdAt: Date.now() - 100000
    },
  ],
}