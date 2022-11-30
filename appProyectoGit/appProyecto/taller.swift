//
//  taller.swift
//  appProyecto
//
//  Created by Alessandro Tolentino Hernandez on 02/11/22.
//

import UIKit

class taller: NSObject {

    
    var ident: String
    var calif: Int
    var codeTaller: String
    var grupoID: String
    var periodo: Int
    var status: String
    var campus: String
    var titulo: String
    var tetramestre: Int
    
    init(ident: String, calif: Int, codeTaller: String, grupoID: String, periodo: Int, status: String, campus: String, titulo: String, tetramestre: Int) {
        self.ident = ident
        self.calif = calif
        self.codeTaller = codeTaller
        self.grupoID = grupoID
        self.periodo = periodo
        self.status = status
        self.campus = campus
        self.titulo = titulo
        self.tetramestre = tetramestre
    }

}
