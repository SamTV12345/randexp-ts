import {defineConfig} from "vite";
import dts from "vite-plugin-dts";
import commonjs from "vite-plugin-commonjs";

export default defineConfig({
    build: {
        lib: {
            entry:  'lib/randexp.ts',
            name: 'randexp'
        },
        rollupOptions:{
            output: {
                preserveModules: false,
                dir: './dist',
                format: 'cjs',
            },
        }
    },
    test:{
       include: ['test/**/*.spec.ts'],
    },
    plugins: [
        dts({
            include:'lib/randexp.ts',
            insertTypesEntry: true,
        }),
        commonjs(),
    ],
});
