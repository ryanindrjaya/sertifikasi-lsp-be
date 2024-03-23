/**
 * mahasiswa controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::mahasiswa.mahasiswa",
  ({ strapi }) => ({
    async find(ctx) {
      const result = await super.find(ctx);

      const [_, jumlahPria] = await strapi.db
        .query("api::mahasiswa.mahasiswa")
        .findWithCount({
          select: ["nama", "gender"],
          where: { gender: "Pria" },
        });

      const [__, jumlahWanita] = await strapi.db
        .query("api::mahasiswa.mahasiswa")
        .findWithCount({
          select: ["nama", "gender"],
          where: { gender: "Wanita" },
        });

      const [___, jumlahMahasiswa] = await strapi.db
        .query("api::mahasiswa.mahasiswa")
        .findWithCount({
          select: ["nama"],
        });

      result.meta.jumlah_pria = jumlahPria;
      result.meta.jumlah_wanita = jumlahWanita;
      result.meta.jumlah_mahasiswa = jumlahMahasiswa;

      return result;
    },
  })
);
