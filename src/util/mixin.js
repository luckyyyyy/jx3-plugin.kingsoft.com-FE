export const dbmMixin = {
  methods: {
    down(id, type) {
      window.open(`/api/dbm/file/down/${id}?type=${type}`)
    },
    rowClick(row) {
      this.$router.push({ name: 'DBM_detail', params: { id: row.fid } });
    },
    edit(id) {
      this.$router.push({ name: 'DBM_upload', params: { id }});
    }
  }
};
