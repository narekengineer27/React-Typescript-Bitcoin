import * as React from "react";
import { connect } from "react-redux";
import DataListTable from "../DataListTable";

class Blogs extends React.Component<any> {

  render() {
    const {} = this.props;

    return (
      <DataListTable
        type="blog"
        fields={[{
          name: 'id',
          label: 'ID',
          sortable: true,
        }, {
          name: 'title',
          label: 'Title',
          sortable: true,
        }, {
          name: 'image',
          label: 'Image',
          sortable: false,
        }, {
          name: 'updated_at',
          label: 'Date/Time',
          sortable: true,
        }, {
          name: 'added_by',
          label: 'Owner',
          sortable: true,
        }, {
          name: 'status_id',
          label: 'Published',
          sortable: true,
        }]}
      />
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Blogs);
