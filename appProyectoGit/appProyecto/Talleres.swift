//
//  Talleres.swift
//  appProyecto
//
//  Created by Hugo Palomares on 18/11/22.
//

import UIKit

class Talleres: NSObject {
    var ident: String
    var nombreTaller: String
    var codigoTaller: String
    var descripTaller: String
    var periodo: Int
    var tetramestre: Int
    
    init(ident: String, nombreTaller: String, codigoTaller: String, descripTaller: String, periodo: Int, tetramestre: Int) {
        self.ident = ident
        self.nombreTaller = nombreTaller
        self.codigoTaller = codigoTaller
        self.descripTaller = descripTaller
        self.periodo = periodo
        self.tetramestre = tetramestre
    }

}
