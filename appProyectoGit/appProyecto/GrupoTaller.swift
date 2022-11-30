//
//  GrupoTaller.swift
//  appProyecto
//
//  Created by Hugo Palomares on 18/11/22.
//

import UIKit

class GrupoTaller: NSObject {
    var ident: String
    var codigoTaller: String
    var grupoID: Int
    
    init(ident: String, codigoTaller: String, grupoID: Int) {
        self.ident = ident
        self.codigoTaller = codigoTaller
        self.grupoID = grupoID
    }

}
