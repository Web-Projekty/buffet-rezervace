<?php

declare (strict_types = 1);

namespace Buffet\Types;

enum OrderStatus: string {
    case Sent = 'sent';           // Objednávka zapsána v systému po odeslání uživatelem
    case Preparing = 'preparing'; // Objednávka je připravována provozovatelem (není možné stornovat uživatelem)
    case Waiting = 'waiting';     // Objednávka je připravena a čeká na vyzvednutí
    case Done = 'done';           // Objednávku uživatel vyzvedl (pop . i zaplatil), uložení do archivu
    case Storno = 'storno';       // Objednávku uživatel zrušil
    case Cancelled = 'cancelled'; // Objednávku zrušil provozovatel nebo admin
}
