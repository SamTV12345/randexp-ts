import {defineConfig} from "vite";

export default defineConfig({
    build: {
        lib: {
            entry:  'lib/randexp.ts',
            name: 'randexp'
        }
    },
    test:{
       include: ['test/**/*.spec.ts'],
    }
});
