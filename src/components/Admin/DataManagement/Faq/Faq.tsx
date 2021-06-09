import * as React from "react";
import { connect } from "react-redux";
import DataListTable from "../DataListTable";

class FAQs extends React.Component<any> {

  render() {
    const {} = this.props;

    return (
      <DataListTable
        type="faq"
        fields={[{
          name: 'id',
          label: 'ID',
          sortable: true,
        }, {
          name: 'question',
          label: 'Question',
          sortable: true,
        }, {
          name: 'answer',
          label: 'Answer',
          sortable: true,
        }, {
          name: 'image',
          label: 'Image',
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

export default connect(mapStateToProps, mapDispatchToProps)(FAQs);












