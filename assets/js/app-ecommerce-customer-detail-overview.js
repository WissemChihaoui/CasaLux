/**
 * Page Detail overview
 */

'use strict';

// Datatable (jquery)
$(function () {
  // Variable declaration for table
  var dt_customer_order = $('.datatables-customer-order'),
    order_details = '../commands/manage.html',
    statusObj = {
      1: { title: 'Non Utilisé', class: 'bg-label-primary' },
      2: { title: 'En cours', class: 'bg-label-success' },
      3: { title: 'Expiré', class: 'bg-label-primary' },
      4: { title: 'Utilisé', class: 'bg-label-info' }
    }

  // orders datatable
  if (dt_customer_order.length) {
    var dt_order = dt_customer_order.DataTable({
      ajax: assetsPath + 'json/ecommerce-customer-order.json', // JSON file to add data
      columns: [
        // columns according to JSON
        { data: '' },
        { data: 'id' },
        { data: 'order' },
        { data: 'products' },
        { data: 'date' },
        { data: 'date_using' },
        { data: 'spent' },
        { data: 'status' },
        { data: 'code' },
        { data: ' ' }
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
          // For Checkboxes
          targets: 1,
          orderable: false,
          searchable: false,
          responsivePriority: 3,
          checkboxes: true,
          render: function () {
            return '<input type="checkbox" class="dt-checkboxes form-check-input">';
          },
          checkboxes: {
            selectAllRender: '<input type="checkbox" class="form-check-input">'
          }
        },
        {
          // order order number
          targets: 2,
          responsivePriority: 4,
          render: function (data, type, full, meta) {
            var $id = full['order'];

            return "<a href='" + order_details + "?id="+$id+"' class='fw-medium'><span>#" + $id + '</span></a>';
          }
        },
        {
          // date
          targets: 3,
          render: function (data, type, full, meta) {
            var $inst = full["inst"];
            return('<button data-bs-toggle="modal" data-bs-target="#viewInstModal" type="button" class="btn text-nowrap btn-label-info d-inline-block">'+
            '<span class="tf-icons ti-sm ti ti-shopping-cart"></span>'+
            '<span class="badge bg-primary text-white badge-notifications">'+$inst.length+'</span>'+
          '</button>'
            );
          }
        },
        {
          // status
          targets: 4,
          render: function (data, type, full, meta) {
            var date = new Date(full.date); // convert the date string to a Date object
            var timeX = full['time'].substring(0, 5);
            var formattedDate = date.toLocaleDateString('fr-FR', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              time: 'numeric'
            });
            return '<span class="text-nowrap">' + formattedDate + ', ' + timeX + '</span>';
          }
        },
        {
          // spent
          targets: 5,
          render: function (data, type, full, meta) {
            var date = new Date(full.date_using); // convert the date string to a Date object
            
            var formattedDate = date.toLocaleDateString('fr-FR', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              time: 'numeric'
            });
            return '<span class="text-nowrap">' + formattedDate +'</span>';
          }
        },
        {
          // Status
          targets: 6,
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
          // Status
          targets: 7,
          render: function (data, type, full, meta) {
            var $status = full['spent'];

            return (
              "<span>"+$status+" €</span>"
            );
          }
        },
        {
          targets: 8,
          render: function (data, type, full, meta) {
            var $code = full['code'];
             return (
              "<span>"+$code+"</span>"
             )
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
              '<div class="text-xxl-center">' +
              '<button class="btn btn-sm btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="ti ti-dots-vertical"></i></button>' +
              '<div class="dropdown-menu dropdown-menu-end m-0">' +
              '<a href="javascript:;" class="dropdown-item">Voir Bon Cadeau</a>' +
              '<a href="javascript:;" class="dropdown-item  delete-record">Supprimer</a>' +
              '</div>' +
              '</div>'
            );
          }
        }
      ],
      order: [[2, 'desc']],
      dom:
        '<"card-header flex-column flex-md-row py-2"<"head-label text-center pt-2 pt-md-0">f' +
        '>t' +
        '<"row mx-4"' +
        '<"col-md-12 col-xl-6 text-center text-xl-start pb-2 pb-lg-0 pe-0"i>' +
        '<"col-md-12 col-xl-6 d-flex justify-content-center justify-content-xl-end"p>' +
        '>',
      lengthMenu: [6, 30, 50, 70, 100],
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

      // For responsive popup
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              var data = row.data();
              return 'Details of ' + data['order'];
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
    $('div.head-label').html('<h5 class="card-title mb-0 text-nowrap">Bons cadeaux</h5>');
  }

  // Delete Record
  $('.datatables-orders tbody').on('click', '.delete-record', function () {
    dt_order.row($(this).parents('tr')).remove().draw();
  });

  // Filter form control to default size
  // ? setTimeout used for multilingual table initialization
  setTimeout(() => {
    $('.dataTables_filter .form-control').removeClass('form-control-sm');
    $('.dataTables_length .form-select').removeClass('form-select-sm');
  }, 300);
});

// Validation & Phone mask
