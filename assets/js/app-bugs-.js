/**
 * app-ecommerce-order-list Script
 */

'use strict';

// Datatable (jquery)

$(function () {
  let borderColor, bodyBg, headingColor;

  if (isDarkStyle) {
    borderColor = config.colors_dark.borderColor;
    bodyBg = config.colors_dark.bodyBg;
    headingColor = config.colors_dark.headingColor;
  } else {
    borderColor = config.colors.borderColor;
    bodyBg = config.colors.bodyBg;
    headingColor = config.colors.headingColor;
  }

  // Variable declaration for table

  var dt_bugs_table = $('.datatables-reports'),
    statusObj = {
      1: { title: 'En Attente', class: 'bg-label-warning' },
      2: { title: 'Résolu', class: 'bg-label-success' },
    }

  // E-commerce Products datatable

  if (dt_bugs_table.length) {
    var dt_products = dt_bugs_table.DataTable({
      ajax: assetsPath + 'json/app-bugs-table.json', // JSON file to add data
      columns: [
        // columns according to JSON
        { data: '' },
        { data: 'report_id' },
        { data: 'date' },
        { data: 'customer' },
        { data: 'product' },
        { data: 'commentaire' },       
        { data: 'status' },
        { data: '' }
      ],
      columnDefs: [
        {
          // For Responsive
          className: 'control',
          searchable: false,
          orderable: false,
          responsivePriority: 2,
          targets: 0,
          render: function (data, type, full, meta) {
            return '';
          }
        },
        
        {
          // Order ID
          targets: 1,
          render: function (data, type, full, meta) {
            var $report_id = full['report_id'];
            // Creates full output for row
            var $row_output = '<a href="manage.html?id='+$report_id+'"><span>#' + $report_id + '</span></a>';
            return $row_output;
          }
        },
        {
          // Date and Time
          targets: 2,
          render: function (data, type, full, meta) {
            var date = new Date(full.date); // convert the date string to a Date object
            
            var formattedDate = date.toLocaleDateString('fr-FR', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              time: 'numeric'
            });
            return '<span class="text-nowrap">' + formattedDate + '</span>';
          }
        },
        {
          // Customers
          targets: 3,
          responsivePriority: 1,
          render: function (data, type, full, meta) {
            var $name = full['customer'];
            // Creates full output for row
            var $row_output =
              '<div class="d-flex justify-content-start align-items-center order-name text-nowrap">' +
              '<h6 class="m-0"><a href="" class="text-body">' +
              $name +
              '</a></h6>' +
              '</div>';
            return $row_output;
          }
        },
        {
         targets: 4,
         render: function (data, type, full, meta) {
            var $product = full['product'];
            // Creates full output for row
            var $row_output =
              '<div class="d-flex justify-content-start align-items-center order-product text-nowrap">' +
              '<h6 class="m-0"><a href="../products/edit.html?id='+$product+'" class="text-body">' +
              $product +
              '</a></h6>' +
              '</div>';
            return $row_output;
          }
        },
        {
            targets: 5,
            render: function (data, type, full, meta) {
                var $commentaire = full['commentaire'];
                // Creates full output for row
                return '<p class="m-0">' + $commentaire + '</p>';
            }
        },
        {
          // Status
          targets: -2,
          render: function (data, type, full, meta) {
            var $status = full['status'];

            return (
              '<span class="badge px-2 ' +
              statusObj[$status].class +
              '" text-capitalized>' +
              statusObj[$status].title +
              '</span>'
            );
          }
        },
        {
          // Actions
          targets: -1,
          title: 'Actions',
          searchable: false,
          orderable: false,
          render: function (data, type, full, meta) {
            return (
              '<div class="d-flex justify-content-sm-center align-items-sm-center">' +
              '<button class="btn btn-sm btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="ti ti-dots-vertical"></i></button>' +
              '<div class="dropdown-menu dropdown-menu-end m-0">' +
              '<a href="manage.html" class="dropdown-item">Voir</a>' +
              '<a href="javascript:0;" class="dropdown-item delete-record">' +
              'Résolu' +
              '</a>' +
              '</div>' +
              '</div>'
            );
          }
        }
      ],
      order: [3, 'asc'], //set any columns order asc/desc
      dom:
        '<"card-header pb-md-2 d-flex flex-column flex-md-row align-items-start align-items-md-center"<f><"d-flex align-items-md-center justify-content-md-end mt-2 mt-md-0 gap-2"l<"dt-action-buttons"B>>' +
        '>t' +
        '<"row mx-2"' +
        '<"col-sm-12 col-md-6"i>' +
        '<"col-sm-12 col-md-6"p>' +
        '>',
      lengthMenu: [7, 10, 15, 30, 60], //for length of menu
      language: {
        sEmptyTable:     "Aucune donnée disponible dans le tableau",
        sInfo:           "Affichage de l'élément _START_ à _END_ sur _TOTAL_ éléments",
        sInfoEmpty:      "Affichage de l'élément 0 à 0 sur 0 élément",
        sInfoFiltered:   "(filtré à partir de _MAX_ éléments au total)",
        sInfoPostFix:    "",
        sInfoThousands:  ",",
        sLengthMenu:     "Afficher _MENU_ éléments",
        sLoadingRecords: "Chargement...",
        sProcessing:     "Traitement...",
        sSearch:         "",
        sZeroRecords:    "Aucun résultat trouvé",
        oPaginate: {
            sFirst:    "Premier",
            sLast:     "Dernier",
            sNext:     "Suivant",
            sPrevious: "Précédent"
        },
        oAria: {
            sSortAscending:  ": activer pour trier la colonne par ordre croissant",
            sSortDescending: ": activer pour trier la colonne par ordre décroissant"
        },
        searchPlaceholder: "Chercher.."
    },
      // Buttons with Dropdown
      buttons: [
        {
          extend: 'collection',
          className: 'btn btn-label-secondary dropdown-toggle',
          text: '<i class="ti ti-download me-1"></i>Export',
          buttons: [
            {
              extend: 'print',
              text: '<i class="ti ti-printer me-2"></i>Print',
              className: 'dropdown-item',
              exportOptions: {
                columns: [2, 3, 4, 5, 6, 7],
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = '';
                    $.each(el, function (index, item) {
                      if (item.classList !== undefined && item.classList.contains('order-name')) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  }
                }
              },
              customize: function (win) {
                // Customize print view for dark
                $(win.document.body)
                  .css('color', headingColor)
                  .css('border-color', borderColor)
                  .css('background-color', bodyBg);
                $(win.document.body)
                  .find('table')
                  .addClass('compact')
                  .css('color', 'inherit')
                  .css('border-color', 'inherit')
                  .css('background-color', 'inherit');
              }
            },
            {
              extend: 'csv',
              text: '<i class="ti ti-file me-2"></i>Csv',
              className: 'dropdown-item',
              exportOptions: {
                columns: [2, 3, 4, 5, 6, 7],
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = '';
                    $.each(el, function (index, item) {
                      if (item.classList !== undefined && item.classList.contains('order-name')) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  }
                }
              }
            },
            {
              extend: 'excel',
              text: '<i class="ti ti-file-export me-2"></i>Excel',
              className: 'dropdown-item',
              exportOptions: {
                columns: [2, 3, 4, 5, 6, 7],
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = '';
                    $.each(el, function (index, item) {
                      if (item.classList !== undefined && item.classList.contains('order-name')) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  }
                }
              }
            },
            {
              extend: 'pdf',
              text: '<i class="ti ti-file-text me-2"></i>Pdf',
              className: 'dropdown-item',
              exportOptions: {
                columns: [2, 3, 4, 5, 6, 7],
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = '';
                    $.each(el, function (index, item) {
                      if (item.classList !== undefined && item.classList.contains('order-name')) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  }
                }
              }
            },
            {
              extend: 'copy',
              text: '<i class="ti ti-copy me-2"></i>Copy',
              className: 'dropdown-item',
              exportOptions: {
                columns: [2, 3, 4, 5, 6, 7],
                format: {
                  body: function (inner, coldex, rowdex) {
                    if (inner.length <= 0) return inner;
                    var el = $.parseHTML(inner);
                    var result = '';
                    $.each(el, function (index, item) {
                      if (item.classList !== undefined && item.classList.contains('order-name')) {
                        result = result + item.lastChild.firstChild.textContent;
                      } else if (item.innerText === undefined) {
                        result = result + item.textContent;
                      } else result = result + item.innerText;
                    });
                    return result;
                  }
                }
              }
            }
          ]
        }
      ],
      // For responsive popup
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              var data = row.data();
              return 'Details of ' + data['customer'];
            }
          }),
          type: 'column',
          renderer: function (api, rowIdx, columns) {
            var data = $.map(columns, function (col, i) {
              return col.title !== '' // ? Do not show row in modal popup if title is blank (for check box)
                ? '<tr data-dt-row="' +
                    col.rowIndex +
                    '" data-dt-column="' +
                    col.columnIndex +
                    '">' +
                    '<td>' +
                    col.title +
                    ':' +
                    '</td> ' +
                    '<td>' +
                    col.data +
                    '</td>' +
                    '</tr>'
                : '';
            }).join('');

            return data ? $('<table class="table"/><tbody />').append(data) : false;
          }
        }
      }
    });
    $('.dataTables_length').addClass('mt-0 mt-md-3 ms-n2');
    $('.dt-action-buttons').addClass('pt-0');
    $('.dataTables_filter').addClass('ms-n3');
  }

  // Delete Record
  $('.datatables-order tbody').on('click', '.delete-record', function () {
    dt_products.row($(this).parents('tr')).remove().draw();
  });

  // Filter form control to default size
  // ? setTimeout used for multilingual table initialization
  setTimeout(() => {
    $('.dataTables_filter .form-control').removeClass('form-control-sm');
    $('.dataTables_length .form-select').removeClass('form-select-sm');
  }, 300);
});
