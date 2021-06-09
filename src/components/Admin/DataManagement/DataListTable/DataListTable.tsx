import * as _ from 'lodash';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from 'Elements/Loader';
import { Meta } from 'Models/Meta';
import SortingIcons from 'Elements/SortingIcons';
import { updateSort } from 'Utils/string';
import { Table, TableRow, TableCell } from 'Elements/Table';
import Responsive from 'Partials/Responsive';
import CheckboxField from 'Elements/CheckboxField';
import ToggleField from 'Elements/ToggleField';
import Button from 'Elements/Button';
import Pagination from 'Elements/Pagination';
import Modal from 'Elements/Modal';
import NoData from './NoData';
import {
  fetchData,
  openDelete,
  confirmDelete,
  cancelDelete,
  openSingleDelete,
  confirmSingleDelete,
  cancelSingleDelete,
  select,
  toggleSelectAll,
  updateBlogStatus
} from './actions';

const styles = require('./data-list-table.css');

class DataListTable extends React.Component<any, any> {
  componentDidMount() {
    this.refresh();
  }

  goToPage(activePage:number) {
    const { meta: { page } } = this.props;
    page.offset = (activePage - 1) * page.limit;
    this.refresh(this.props.meta);
  }

  refresh(meta:Meta = this.props.meta) {
    const { type } = this.props;
    this.props.fetchData(meta, type);
  }

  sort(field:string, decreasing:boolean = false) {
    return () => {
      const { meta: { sort } } = this.props;
      this.props.meta.sort = updateSort(sort, field, decreasing);
      this.refresh(this.props.meta);
    };
  }

  renderHeaderFields() {
    const { toggleSelectAll, allSelected, meta, data, fields } = this.props;

    const primarySort = meta.sort.split(',')[0].trim().replace(/-/g, '');
    const onIncreasing = ((field:string) => {
      return this.sort(field);
    }).bind(this);
    const onDecreasing = ((field:string) => {
      return this.sort(field, true);
    }).bind(this);

    const $fieldHeaders = fields.map((field, index) => {
      return (
        <TableCell header bold key={index} className={styles[field.name]}>
          <div className={`flex full-width`}>{field.label}
            <div className="vertical-center">
              {field.sortable && <SortingIcons
                primary={primarySort === field.name}
                onIncreasing={onIncreasing(field.name)}
                onDecreasing={onDecreasing(field.name)}
              />}
            </div>
          </div>
        </TableCell>
      );
    });
    $fieldHeaders.unshift((
      <TableCell header bold className={styles.selectAll} key="selectAll">
        <CheckboxField
          checked={allSelected}
          onChange={() => {
            toggleSelectAll(!allSelected, data);
          }}
          noMargin
          isFormField={false}
          label=" "
          name="checkbox"
        />
      </TableCell>
    ));
    $fieldHeaders.push((
      <TableCell header bold className={`flex full-width ${styles.actions}`} key="actions">Actions</TableCell>
    ));

    return $fieldHeaders;
  }

  renderData() {
    const {
      data,
      openSingleDelete,
      select,
      selectedRecords,
      updateBlogStatus,
      fields,
      type,
    } = this.props;

    return data.map((m, index) => {
      const checked = !!selectedRecords.find(r => m.id === r.id);
      return (
        <div key={index} className={styles.tableRow}>
          <TableRow>
            <TableCell className={styles.selectAll} key={'selectAll'}>
              <CheckboxField
                checked={checked}
                onChange={(selected) => select(selected, m, selectedRecords)}
                noMargin
                isFormField={false}
                label=""
                name="checkbox"
              />
            </TableCell>
            {fields.map(f => {
              return f.name === 'status_id' ? (
                <TableCell className={styles.status} key={'status'}>
                  <ToggleField
                    checked={m.status === 'Published'}
                    onChange={(e) => updateBlogStatus(m, e.target.checked, data, type)}
                    loading={m.loading}
                  />
                </TableCell>
              ) : (
                f.name === 'image' ? (
                  <TableCell key={f.name} className={styles[f.name]}>
                    <img src={m.image} className={styles.imageSrc} alt=""/>
                  </TableCell>
                ) : (
                  <TableCell key={f.name} className={styles[f.name]}>{m[f.name]}</TableCell>
                )
              );
            })}
            <TableCell className={styles.actions} key={'actions'}>
              <Link to={`/admin/data-management/${type}/edit/${m.id}`}>
                <Button
                  className="small orange">
                  Edit
                </Button>
              </Link>
              <Button
                onClick={() => openSingleDelete(m)}
                className="small red">
                Remove
              </Button>
            </TableCell>
          </TableRow>
        </div>
      );
    });
  }

  renderDelete() {
    const { deleteStatus, confirmDelete, cancelDelete, selectedRecords, type } = this.props;
    return (
      <Modal
        isOpen={deleteStatus.progressing}
        title={`Remove ${_.capitalize(type)}`}
        confirmButtonText="Remove"
        cancelButtonText="Cancel"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        buttonStyle={{ width: 'auto' }}
        buttonClassName="medium red"
        buttonLoading={deleteStatus.loading}
      >
        <div>
          <p className={styles.headerTitle}>
            Are you sure you want to remove these {type}s?
          </p>
          <ol className={styles.selectedRecord}>
            {selectedRecords.map((s, i) => (
              <li key={i}>{s.title}</li>
            ))}
          </ol>
        </div>
      </Modal>
    );
  }

  render() {
    const {
      data,
      meta: { page },
      status,
      openDelete,
      singleDeleteStatus,
      confirmSingleDelete,
      cancelSingleDelete,
      selectedRecords,
      singleDeleteRecord,
      type,
    } = this.props;

    const $fields = this.renderHeaderFields();
    const $data = this.renderData();

    return (
      <div>
        <Responsive name="desktop">
          <div>
            <div className={styles.tableWrapper}>
              <div className={styles.btnGroup}>
                <div className={styles.deleteBtn}>
                  <Button
                    onClick={() => openDelete(selectedRecords)}
                    className="red medium">
                    Remove {selectedRecords.length > 0 ? selectedRecords.length : ''}
                  </Button>
                </div>
                <Link to={`/admin/data-management/${type}/add`}>
                  <Button className="green medium">
                    Add New {type}
                  </Button>
                </Link>
              </div>
              <Table className="relative">
                <TableRow className={styles.tableContent}>{$fields}</TableRow>
                {data.length > 0 ? (
                  <div className={styles.scrollableTable}>
                    {$data}
                  </div>
                ) : (<NoData type={type}></NoData>)}
                <Loader topShift={37} isOpen={status.loading}></Loader>
              </Table>
              <div className={styles.pagination}>
                {page.total_pages > 1 &&
                <Pagination
                  onChange={this.goToPage.bind(this)}
                  activePage={Number(page.offset / page.limit) + 1}
                  totalPages={page.total_pages}/>}
              </div>
            </div>
          </div>
          {this.renderDelete()}
        </Responsive>

        <Modal
          isOpen={singleDeleteStatus.progressing}
          title={`Remove ${_.capitalize(type)}`}
          confirmButtonText="Remove"
          cancelButtonText="Cancel"
          onConfirm={() => confirmSingleDelete(singleDeleteRecord.id, data, type)}
          onCancel={cancelSingleDelete}
          buttonStyle={{ width: 'auto' }}
          buttonClassName="medium red"
          buttonLoading={singleDeleteStatus.loading}
        >
          <div>
            <p className={styles.headerTitle}>
              Are you sure you want to delete {singleDeleteRecord.title}?
            </p>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  data: state.dataListTable.data,
  status: state.dataListTable.status,
  meta: state.dataListTable.meta,
  deleteStatus: state.dataListTable.delete.status,
  singleDeleteStatus: state.dataListTable.singleDelete.status,
  selectedRecords: state.dataListTable.selectedRecords,
  singleDeleteRecord: state.dataListTable.singleDelete.record,
  allSelected: state.dataListTable.allSelected,
  ...ownProps,
});

const mapDispatchToProps = {
  fetchData,
  openDelete,
  confirmDelete,
  cancelDelete,
  openSingleDelete,
  confirmSingleDelete,
  cancelSingleDelete,
  select,
  toggleSelectAll,
  updateBlogStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(DataListTable);
