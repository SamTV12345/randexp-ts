import {defineConfig} from "vite";
import dts from "vite-plugin-dts";
import commonjs from '@rollup/plugin-commonjs';

export default defineConfig({
    build: {
        lib: {
            entry:  'lib/randexp.ts',
            name: 'randexp',
            fileName: (format) => `[name].${format === "cjs" ? "c" : "m"}js`,
            formats: ["cjs"],
        },
        rollupOptions:{
            output:{
                preserveModules: false,
                dir: './dist',
                format: 'cjs',
            }
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
