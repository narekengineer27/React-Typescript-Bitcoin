import * as React from "react";
import { connect } from "react-redux";
import DataListTable from "../DataListTable";

class Article extends React.Component<any> {

  render() {
    const {} = this.props;

    return (
      <DataListTable
        type="article"
        fields={[{
          name: 'id',
          label: 'ID',
          sortable: true,
        }, {
          name: 'slug',
          label: 'Slug',
          sortable: false,
        }, {
          name: 'title',
          label: 'Title',
          sortable: true,
        }, {
          name: 'subtitle',
          label: 'Subtitle',
          sortable: true,
        }, {
          name: 'text',
          label: 'Text',
          sortable: true,
        }, {
          name: 'image',
          label: 'Image',
          sortable: true,
        }, {
          name: 'added_by',
          label: 'Added By',
          sortable: true,
        }, {
          name: 'updated_at',
          label: 'Update At',
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

export default connect(mapStateToProps, mapDispatchToProps)(Article);












