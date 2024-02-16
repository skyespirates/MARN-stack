# Tips Query dan Mutation di @apollo/server

1. buat query di typedefs
2. buat implementasi query di resolver property Query

3. buat definisi mutasi di type Mutation
4. buat implementasi mutasi di resolvers property Mutation

## langkah kerjanya kurang lebih seperti berikut

1. mulai dengan mendefinisikan type di file models/index.js
2. di file resolver.js terapkan bagaimana server menangani request dan apa response nya
3. repeat

perhatikan file server.js, di file tersebut di inisialisasikan apollo server yang akan mencocokkan apakah definisi telah sesuai dengan implementasi, sehingga ketika request dilakukan graphql mampu memberikan petunjuk tentang request seperti apa yang query/mutation harapkan serta apa yang akan direturn oleh query/mutation.

### models/typeDefs.js

```javascript
    type Query {
    hello(name: String!): String
    }
```

baris kode di atas berarti, ada suatu method query bernama **hello** yang menerima satu parameter dengan tipe String, tanda seru '!' setelah tipe data parameter berarti mandatory atau required, sehingga tidak boleh null. method akan meng return suatu string.

### resolver.js

```javascript
export const resolvers = {
  Query: {
    hello: (_, { name }) => `hello ${name}!`,
  },
};
```

kode diatas merupakan implementasi dari definisi yang telah dibuat, di dalam resolver ada query **hello** yang menerima **name** sebagai argumen dan mereturn string `'hello ${name}'`

### kesimpulan

Untuk membuat query graphql berhasil, antara definisi query/mutation dan implementasi query/mutation harus sesuai sehingga hasil yang diinginkan bisa diprediksi
